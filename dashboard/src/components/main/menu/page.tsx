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

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {menuItems.map((item) => (
        <React.Fragment key={item.title}>
          {item.subItems ? (
            <>
              <ListItemButton
                selected={pathname === item.link}
                onClick={() => handleClick(item.title)}
              >
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.title} />
                {openItems[item.title] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.title}
                      onClick={() => handleNavigation(subItem.link)}
                      selected={pathname === subItem.link}
                    >
                      <ListItemIcon>
                        <Icon>{subItem.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText primary={subItem.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItemButton
              onClick={() => handleNavigation(item.link)}
              selected={pathname === item.link}
            >
              <ListItemIcon>
                <Icon>{item.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          )}
        </React.Fragment>
      ))}
    </List>
  );
}
