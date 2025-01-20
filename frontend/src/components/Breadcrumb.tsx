"use client";
import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Typography } from "@mui/material";
interface MenuItem {
  title: string;
  link?: string;
  subItems?: MenuItem[];
}

interface BreadcrumbComponentProps {
  menuItems: MenuItem[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  menuItems,
}) => {
  const currentPath = usePathname();

  const findBreadcrumbPath = (items: any[], currentPath: string): any[] => {
    if (currentPath.endsWith("/form")) {
      const basePath = currentPath.slice(0, -5); // Remove "/form" from the end
      const basePathBreadcrumb = findBreadcrumbPath(items, basePath);

      // Parse the query parameters
      const query = new URLSearchParams(window.location.search);
      const isUpdate = query.get("id") !== null;

      if (basePathBreadcrumb.length) {
        return [
          ...basePathBreadcrumb,
          { title: isUpdate ? "Güncelle" : "Yeni Oluştur", link: currentPath },
        ];
      }
    }

    if (currentPath.endsWith("/view")) {
      const basePath = currentPath.slice(0, -5); // Remove "/form" from the end
      const basePathBreadcrumb = findBreadcrumbPath(items, basePath);
      if (basePathBreadcrumb.length) {
        return [
          ...basePathBreadcrumb,
          { title: "Görüntüle", link: currentPath },
        ];
      }
    }
    for (const item of items) {
      if (item.link === currentPath) {
        return [item];
      }
      if (item.subItems) {
        const subPath = findBreadcrumbPath(item.subItems, currentPath);
        if (subPath.length) {
          return [item, ...subPath];
        }
      }
    }
    return [];
  };

  const breadcrumbPath = findBreadcrumbPath(menuItems, currentPath);
  const router = useRouter();
  return (
    <Breadcrumbs
      style={{
        flexGrow: 0.5,
        textAlign: "left",
      }}
      sx={{
        color: "white",
      }}
      aria-label="breadcrumb"
    >
      {breadcrumbPath.map((item, index) => (
        <Typography
          key={index}
          color={
            index === breadcrumbPath.length - 1
              ? "white"
              : "rgba(255,255,255,0.7)"
          }
          onClick={() => {
            item.link && router.push(item.link);
          }}
          sx={
            index === breadcrumbPath.length - 1
              ? {
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  fontWeight: "bold",
                }
              : {
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  fontWeight: "500",
                }
          }
          aria-current={
            index === breadcrumbPath.length - 1 ? "page" : undefined
          }
        >
          {item.title}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbComponent;
