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
  desc?: string;
  allowedDepartments?: string[];
  subItems?: MenuItem[];
}

interface MenuProps {
  setOpen: (open: boolean) => void;
}

export default function Menu(props: MenuProps) {
  const { setOpen } = props;
  const pathname = usePathname();
  const router = useRouter();
  const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>(
    {}
  );

  // Load open items state from localStorage on mount
  React.useEffect(() => {
    const savedState = localStorage.getItem("openItems");
    if (savedState) {
      setOpenItems(JSON.parse(savedState));
    }
  }, []);

  // Save open items state to localStorage on change
  React.useEffect(() => {
    localStorage.setItem("openItems", JSON.stringify(openItems));
  }, [openItems]);

  const handleClick = (itemTitle: string) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [itemTitle]: !prevState[itemTitle],
    }));
  };

  const handleNavigation = (link?: string) => {
    if (link) {
      if (window.innerWidth < 600) {
        setOpen(false);
      }
      router.push(link);
    }
  };

  const personnel = JSON.parse(localStorage.getItem("personnel") || "{}");
  const userDepartment = personnel.department;

  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter(
        (item) =>
          !item.allowedDepartments ||
          item.allowedDepartments.includes(userDepartment)
      )
      .map((item) => ({
        ...item,
        subItems: item.subItems ? filterMenuItems(item.subItems) : undefined,
      }));
  };

  const renderMenuItems = (
    items: MenuItem[],
    parentKey: string = "",
    level: number = 0
  ) => {
    return items.map((item) => {
      const key = parentKey ? `${parentKey}-${item.title}` : item.title;
      const isOpen = openItems[key];

      return (
        <React.Fragment key={key}>
          {item.subItems ? (
            <>
              <ListItemButton
                selected={pathname === item.link}
                title={item.desc}
                onClick={() => handleClick(key)}
                sx={{ pl: level * 2 + 2 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small">{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.title} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderMenuItems(item.subItems, key, level + 1)}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItemButton
              title={item.desc}
              onClick={() => handleNavigation(item.link)}
              selected={pathname === item.link}
              sx={{ pl: level * 2 + 2 }}
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

  const renderMobileSettings = () => {
    return (
      <>
        <ListItemButton
          title="Kullanıcı Ayarları"
          onClick={() => handleClick("user-settings")}
          sx={{ pl: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Icon fontSize="small">settings</Icon>
          </ListItemIcon>
          <ListItemText primary="Kullanıcı Ayarları" />
          {openItems["user-settings"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openItems["user-settings"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              title="Profil"
              onClick={() => handleNavigation("/profile")}
              selected={pathname === "/profile"}
              sx={{ pl: 4 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon fontSize="small">person</Icon>
              </ListItemIcon>
              <ListItemText primary="Profil" />
            </ListItemButton>
            <ListItemButton
              title="Çıkış Yap"
              onClick={() => handleNavigation("/logout")}
              selected={pathname === "/logout"}
              sx={{ pl: 4 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon fontSize="small">logout</Icon>
              </ListItemIcon>
              <ListItemText primary="Çıkış Yap" />
            </ListItemButton>
          </List>
        </Collapse>
      </>
    );
  };

  const filteredMenuItems = filterMenuItems(menuItems);
  const isMobile = window.innerWidth < 600;

  return (
    <List component="nav">
      {renderMenuItems(filteredMenuItems)}
      {isMobile && renderMobileSettings()}
    </List>
  );
}
