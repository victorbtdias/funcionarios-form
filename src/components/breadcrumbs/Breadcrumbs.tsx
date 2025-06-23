import { Circle } from "@mui/icons-material";
import { Breadcrumbs } from "@mui/material";

interface BreadcrumbsProps {
  breadcrumbs: React.ReactNode[];
}

export const DefaultBreadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <Breadcrumbs
      separator={
        <Circle sx={{ fontSize: 5, color: "text.disabled", mx: "4px" }} />
      }
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};
