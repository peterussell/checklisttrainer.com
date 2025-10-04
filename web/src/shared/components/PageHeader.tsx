import { Stack, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type PageHeaderProps = {
  title: string[],
  subtitle?: string,
  backLink?: React.ReactElement
}

export function PageHeader({ title, subtitle, backLink }: PageHeaderProps) {
  return (
    <Stack direction="row" className="w-full justify-between items-center">
      <Stack>
        {/* Title */}
        <Typography variant="h4" className="pb-0">
          {title.map((t, i) => (
            <>
              {t}
              {i !== title.length-1 ? <ChevronRightIcon fontSize="large" className="pb-1" /> : null}
            </>
          ))}
        </Typography>
        {subtitle && <Typography variant="body2">{subtitle}</Typography>}
      </Stack>
      
      {/* Back link */}
      {backLink && (
        <Stack direction="row">
          <ChevronLeftIcon />
          <Typography><>{backLink}</></Typography>
        </Stack>
      )}
    </Stack>
  )
}
