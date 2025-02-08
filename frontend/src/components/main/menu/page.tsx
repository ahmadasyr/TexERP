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
import { getPersonnelInfo } from "@/contexts/auth";
import { set } from "date-fns";
import Link from "next/link";

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
  const [userDepartment, setUserDepartment] = React.useState<string | null>(
    null
  );
  // Load open items state from localStorage on mount
  React.useEffect(() => {
    const savedState = localStorage ? localStorage.getItem("openItems") : null;
    if (savedState) {
      setOpenItems(JSON.parse(savedState));
    }
    const personnel = getPersonnelInfo() || {};
    setUserDepartment(personnel?.department);
  }, []);

  // Save open items state to localStorage on change
  React.useEffect(() => {
    if (localStorage) {
      localStorage.setItem("openItems", JSON.stringify(openItems));
    }
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

  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter(
        (item) =>
          !item.allowedDepartments ||
          (userDepartment && item.allowedDepartments.includes(userDepartment))
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
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              href={item.link || "#"}
              passHref
            >
              <ListItemButton
                title={item.desc}
                selected={pathname === item.link}
                disabled={item.link === "/" || item.link === "#"}
                sx={{ pl: level * 2 + 2 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small">{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
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
            <Icon fontSize="small">account_circle</Icon>
          </ListItemIcon>
          <ListItemText primary="Kullanıcı Ayarları" />
          {openItems["user-settings"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openItems["user-settings"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              href="/profile"
              passHref
            >
              <ListItemButton
                title="Profil"
                selected={pathname === "/profile"}
                sx={{ pl: 4 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small">person</Icon>
                </ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItemButton>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              href="/logout"
              passHref
            >
              <ListItemButton
                title="Çıkış Yap"
                selected={pathname === "/logout"}
                sx={{ pl: 4 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small">logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Çıkış Yap" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </>
    );
  };

  const renderDepartmentHeadMenu = () => {
    return (
      <>
        <ListItemButton
          title="Bölüm Müdürü"
          onClick={() => handleClick("department-head")}
          sx={{ pl: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Icon fontSize="small">account_circle</Icon>
          </ListItemIcon>
          <ListItemText primary="Bölüm Müdürü" />
          {openItems["department-head"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={openItems["department-head"]}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={"/my-subordinates"}
              passHref
            >
              <ListItemButton
                title="Alt Çalışanlarım"
                selected={pathname === "/my-subordinates"}
                sx={{ pl: 4 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small">group</Icon>
                </ListItemIcon>
                <ListItemText primary="Alt Çalışanlarım" />
              </ListItemButton>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={"/subordinate-requests"}
              passHref
            >
              <ListItemButton
                title="Satın Alma Talepleri"
                selected={pathname === "/subordinate-requests"}
                sx={{ pl: 4 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small">shopping_cart</Icon>
                </ListItemIcon>
                <ListItemText primary="Satın Alma Talepleri" />
              </ListItemButton>{" "}
            </Link>
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
      {getPersonnelInfo()?.isDepartmentHead && renderDepartmentHeadMenu()}
      {isMobile && renderMobileSettings()}
    </List>
  );
}
