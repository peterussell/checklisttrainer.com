import { Box, IconButton, Menu, MenuItem, MenuList, Stack, Tooltip, Typography } from "@mui/material";
import Add from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlaceIcon from '@mui/icons-material/Place';
import Refresh from '@mui/icons-material/Refresh';
import Remove from '@mui/icons-material/Remove';
import { KeepScale, TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { AircraftControl, AircraftView } from "../../../../core/models/Aircraft";
import { useEffect, useRef, useState } from "react";

type FlightDeckViewerProps = {
  views: AircraftView[],
  onActionSelected: (control: string, action: string) => void;
};

export function FlightDeckViewer({ views, onActionSelected }: FlightDeckViewerProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Thumbnails - display left/right thumbnail overflow scroll indicators
  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const { scrollWidth, clientWidth } = thumbnailContainerRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    }
  }, [views]);

  // Track the selected thumbnail
  useEffect(() => {
    setSelectedIdx(views.findIndex(i => i.isDefault) ?? 0);
  }, [views]);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedControl, setSelectedControl] = useState<AircraftControl | null>(null);

  function handleControlClick(event: React.MouseEvent<HTMLElement>, control: AircraftControl) {
    setMenuAnchor(event.currentTarget);
    setSelectedControl(control);
  };

  function handleActionsMenuClose() {
    setMenuAnchor(null);
    setSelectedControl(null);
  };

  if (!views?.length) return null;

  return (
    <Stack gap={1}>
      {/* Active view */}
      {selectedIdx === null ? (
        <Typography>No view selected</Typography>
      ) : (
        <TransformWrapper maxScale={2.5}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent>
                <div className="relative">
                  <img src={`/${views[selectedIdx].src}`}/>

                  {views[selectedIdx].controls.map((control, i) => {
                    const yPosFromBottom = 100 - control.yPos;

                    return (
                      <Box key={i}>
                        {/* Checklist control icon */}
                        <KeepScale key={i} className="absolute" style={{ bottom: `${yPosFromBottom}%`, left: `${control.xPos}%` }}>
                          <Tooltip title={control.title}>
                            <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => handleControlClick(e, control)}>
                              <PlaceIcon
                                className="fill-blue-800 hover:fill-blue-500 stroke-white stroke-[0.5]"
                                style={{ transform: `rotate(${control.markerRotation ?? 0}deg)`}}
                              />
                            </IconButton>
                          </Tooltip>
                        </KeepScale>
                      </Box>
                      );
                    }
                  )}
                </div>
              </TransformComponent>

              {/* Actions menu */}
              {menuAnchor && (
                <Menu
                  anchorEl={menuAnchor}
                  open={menuAnchor !== null}
                  onClose={handleActionsMenuClose}
                  slotProps={{ root: { sx: { '.MuiList-root': { padding: 0 }}} }}
                >
                  <Box className="w-full px-2 pb-1 bg-blue-800">
                    <Typography variant="caption" className="text-white">
                      {selectedControl?.title}
                    </Typography>
                  </Box>
                  <MenuList dense>
                    {selectedControl?.actions?.map((a: string, i: number) => (
                      <MenuItem
                        className="px-2"
                        key={i}
                        onClick={() => {
                          onActionSelected(selectedControl.title, a);
                          handleActionsMenuClose();
                        }}><Typography variant="caption">{a}</Typography></MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}

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
          ref={thumbnailContainerRef}
          direction="row"
          gap={1}
          className="overflow-x-auto flex-nowrap pb-4"
        >
          
          {views.map((view, i) => (
            <Stack className="items-center" key={i}>
              <img
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
