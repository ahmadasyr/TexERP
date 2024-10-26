"use client";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import menuItems from "./menuItems.json";
import { usePathname, useRouter } from "next/navigation";

interface MenuItem {
  title: string;
  link?: string;
  icon?: string;
  subItems?: MenuItem[];
}

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();
  const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>(
    {}
  );

  // Load collapsed state from localStorage
  React.useEffect(() => {
    const savedState = localStorage.getItem("openItems");
    if (savedState) {
      setOpenItems(JSON.parse(savedState));
    }
  }, []);

  // Update localStorage whenever openItems changes
  React.useEffect(() => {
    localStorage.setItem("openItems", JSON.stringify(openItems));
  }, [openItems]);

  const handleClick = (itemTitle: string) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [itemTitle]: !prevState[itemTitle],
    }));
  };

  const handleNavigation = (link: string) => {
    router.push(link);
  };

  const renderMenuItems = (
    items: MenuItem[],
    parentKey: string = "",
    level: number = 0
  ) => {
    return items.map((item) => {
      const key = parentKey ? `${parentKey}-${item.title}` : item.title;
      return (
        <React.Fragment key={key}>
          {item.subItems ? (
            <>
              <ListItemButton
                selected={pathname === item.link}
                onClick={() => handleClick(key)}
                sx={{
                  pl: level * 2 + 2, // Add padding based on the level
                  position: "relative", // For line positioning
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    left: `${level * 16}px`, // Position line to the left based on level
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    backgroundColor: "grey.400", // Level line color
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small">{item.icon}</Icon>{" "}
                  {/* Adjust icon size */}
                </ListItemIcon>
                <ListItemText primary={item.title} />
                {openItems[key] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openItems[key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderMenuItems(item.subItems, key, level + 1)}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItemButton
              onClick={() => handleNavigation(item.link!)}
              selected={pathname === item.link}
              sx={{
                pl: level * 2 + 2,
                position: "relative",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  left: `${level * 16}px`, // Adjust based on level for each item
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: "grey.400",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon fontSize="small">{item.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
    >
      {renderMenuItems(menuItems)}
    </List>
  );
}
