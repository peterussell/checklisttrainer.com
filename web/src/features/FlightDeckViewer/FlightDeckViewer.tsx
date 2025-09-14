import { IconButton, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Refresh from '@mui/icons-material/Refresh';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { AircraftView } from "../../../../core/models/Aircraft";
import { useEffect, useRef, useState } from "react";

export function FlightDeckViewer({ views }: { views: AircraftView[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Used to display chevron if thumbnails are scrollable
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  
  useEffect(() => {
    setSelectedIdx(views.findIndex(i => i.isDefault) ?? 0);
  }, [views])

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  }, [views]);

  if (!views?.length) return null;

  return (
    <Stack gap={1}>
      {/* Hero view */}
      {selectedIdx === null ? (
        <Typography>No view selected</Typography>
      ) : (
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent>
                <img src={`/${views[selectedIdx].src}`} className="rounded-md" />
              </TransformComponent>

              {/* Zoom controls */}
              <Stack direction="row" className="z-10 flex justify-end">
                <IconButton onClick={() => zoomIn()}><Add /></IconButton>
                <IconButton onClick={() => zoomOut()}><Remove /></IconButton>
                <IconButton onClick={() => resetTransform()}><Refresh /></IconButton>
              </Stack>
            </>
          )}
        </TransformWrapper>
      )}

      {/* Scrollable thumbnails */}
      <Stack direction="row" className="items-center">

        {isOverflowing && <ChevronLeftIcon fontSize="large" key="chevronLeft" className="mb-8" />}

        {/* Internal thumbnail stack */}
        <Stack
          ref={containerRef}
          direction="row"
          gap={1}
          className="overflow-x-auto flex-nowrap pb-4"
        >
          
          {views.map((view, i) => (
            <Stack className="items-center">
              <img
                key={i}
                src={`/${view.src}`}
                className={`
                  cursor-pointer
                  rounded-md
                  p-0.5
                  mb-1
                  h-full
                  object-cover
                  max-w-[200px]
                  border-2 border-gray-500 ${(i !== selectedIdx) ? 'border-transparent' : ''}`}
                onClick={() => setSelectedIdx(i)}/>
              <Typography variant="caption">{view.description}</Typography>
            </Stack>
          ))}
        </Stack>

        {isOverflowing && <ChevronRightIcon fontSize="large" key="chevronRight" className="mb-8" />}
        
      </Stack>
    </Stack>
  );
};
