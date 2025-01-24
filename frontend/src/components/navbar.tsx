"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Switch,
  InputBase,
  Autocomplete,
  TextField,
  Grid,
  Breadcrumbs,
  Link,
  Icon,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
  Button,
} from "@mui/material";
import { handleLogout, getPersonnelInfo } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import menuItems from "./main/menu/menuItems.json";
import BreadcrumbComponent from "./Breadcrumb";
import {
  Close,
  Delete,
  DeleteForever,
  Logout,
  Settings,
  Widgets,
} from "@mui/icons-material";
import { notificationIcon } from "./notifications/utils";
interface PrimaryAppBarProps {
  toggleDrawer: () => void;
  toggleTheme: () => void;
  open: boolean;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<true | false>>;
}
interface Notifications {
  id: number;
  category: string;
  title: string;
  description: string;
  link?: string;
  read: boolean;
}

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        content: '"🌙"',
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#ffd700",
    width: 32,
    height: 32,
    "&:before": {
      content: '"☀️"',
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

export default function PrimaryAppBar({
  toggleDrawer,
  toggleTheme,
  open,
  theme,
  setTheme,
}: PrimaryAppBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notifications[]>([]);
  const [unreadNotifications, setUnreadNotifications] = React.useState(0);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [customers, setCustomers] = React.useState<
    { id: string; name: string }[]
  >([]);
  const router = useRouter();

  const personnel = getPersonnelInfo();
  const fetchNotifications = () => {
    fetch("/api/notification/personnel/" + personnel?.id)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data || []);
        setUnreadNotifications(
          data.filter((notification: Notifications) => !notification.read)
            .length
        );
      })
      .catch((err) => {
        return 0;
      });
  };
  React.useEffect(() => {
    if (personnel?.department === "sts") {
      fetch("/api/customer")
        .then((res) => res.json())
        .then((data) => {
          setCustomers(data || []);
        })
        .catch((err) => {
          return 0;
        });
    }
    fetchNotifications();
  }, []);
  React.useEffect(() => {
    fetchNotifications();
  }, [isNotificationsOpen]);
  const handleNotificationClick = (link: string) => {
    router.push(link);
  };
  const handleNotificationRead = (id: number) => {
    fetch("/api/notification/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ read: true }),
    })
      .then(() => {
        setNotifications(
          notifications.map((notification) =>
            notification.id === id
              ? { ...notification, read: true }
              : notification
          )
        );
      })
      .catch((err) => {
        return 0;
      });
  };
  const handleNotificationDelete = (id: number) => {
    fetch("/api/notification/" + id, {
      method: "DELETE",
    })
      .then(() => {
        setNotifications(
          notifications.filter((notification) => notification.id !== id)
        );
      })
      .catch((err) => {
        return 0;
      });
  };
  const markAllAsRead = () => {
    fetch("/api/notification/markAllAsRead", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personnelId: personnel.id }),
    })
      .then(() => {
        setNotifications(
          notifications.map((notification) => ({
            ...notification,
            read: true,
          }))
        );
        setUnreadNotifications(0);
      })
      .catch((err) => {
        return 0;
      });
  };
  const renderNotifications = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isNotificationsOpen}
        onClose={() => {
          setIsNotificationsOpen(false);
        }}
        slotProps={{
          paper: {
            sx:
              window.innerWidth < 600
                ? {
                    width: "100%",
                    height: "100vh",
                    overflowY: "hidden",
                    pt: ".5rem",
                  }
                : {
                    marginTop: "3rem",
                    width: "30rem",
                    height: "25rem",
                    overflowY: "hidden",
                    borderRadius: "0.5rem",
                    pt: ".5rem",
                  },
          },
        }}
      >
        {notifications.length === 0 ? (
          <Box
            sx={{
              paddingTop: "2rem",
              justifyItems: "center",
              verticalAlign: "middle",
              margin: "auto",
              width: "80%",
            }}
          >
            <NotificationsIcon
              style={{
                fontSize: "10rem",
                color: "rgba(0, 0, 0, 0.2)",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                width: "100%",
              }}
              fontWeight={"bold"}
            >
              Bildirim yok
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                width: "100%",
              }}
            >
              Şu anda görüntülenecek herhangi bir bildirim yoktur.
            </Typography>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                justifyContent: "space-evenly",
                width: "50%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={
                  {
                    // marginRight: "0.5rem",
                  }
                }
                onClick={() => {
                  setIsNotificationsOpen(false);
                }}
              >
                Kapat
              </Button>
              <Button
                onClick={fetchNotifications}
                variant="outlined"
                color="secondary"
              >
                Yenile
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
              }}
            >
              <Typography fontWeight="bold" variant="h6" sx={{ ml: 0.5 }}>
                Bildirimler
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  color: "primary.main",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
                onClick={markAllAsRead}
              >
                Tümünü okundu olarak işaretle
              </Typography>
            </Box>

            <Box
              sx={{
                height: window.innerWidth < 600 ? "77vh" : "20rem",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={() => {
                    handleNotificationClick(notification.link || "#");
                    handleNotificationRead(notification.id);
                    setIsNotificationsOpen(false);
                  }}
                  sx={{
                    width: "100%",
                    backgroundColor: notification.read
                      ? "transparent"
                      : "rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: notification.read
                        ? "transparent"
                        : "primary.main",
                      color: notification.read
                        ? "primary.main"
                        : "primary.contrastText",
                      marginRight: ".5rem",
                      width: "2rem",
                      height: "2rem",
                    }}
                  >
                    <Icon>
                      {
                        notificationIcon[
                          notification.category as keyof typeof notificationIcon
                        ]
                      }
                    </Icon>
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: notification.read ? "normal" : "600",
                        whiteSpace: "normal",
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography sx={{ whiteSpace: "normal" }} variant="body2">
                      {notification.description}
                    </Typography>
                  </Box>
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationDelete(notification.id);
                    }}
                  >
                    <Close />
                  </IconButton>
                </MenuItem>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
                height: "2rem",
                marginLeft: "0.5rem",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                {unreadNotifications} okunmamış
              </Typography>
            </Box>
          </Box>
        )}
      </Menu>
    );
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const toggleThemeWithStorage = () => {
    const newTheme = theme === true ? false : true;
    setTheme(newTheme);
    toggleTheme();
    if (localStorage) {
      localStorage.setItem("darkMode", JSON.stringify(newTheme));
    }
  };

  const handleCustomerSelect = (event: any, value: { id: string } | null) => {
    if (value) {
      router.push(`/customer/view/?id=${value.id}`);
    }
  };
  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsNotificationsOpen(true);
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const Searcher = () => {
    type OptionType =
      | { name: string; group: string }
      | {
          title: string;
          group: string;
          link: string;
          allowedDepartments?: string[];
        };

    const getSearchOptions = () => {
      // Customer options
      const customerOptions = customers.map((customer) => ({
        ...customer,
        group: "Müşteriler", // Static group for all customers
      }));

      // Menu items
      const groupedSubItems = menuItems
        .map((item) =>
          item.allowedDepartments?.includes(personnel?.department) === true
            ? (item.subItems || [])
                .filter(
                  (subItem: any) =>
                    !subItem?.allowedDepartments ||
                    subItem?.allowedDepartments.includes(personnel?.department)
                )
                .flatMap((subItem) =>
                  "subItems" in subItem
                    ? (subItem.subItems || [])
                        .filter(
                          (deepSubItem: any) =>
                            !deepSubItem?.allowedDepartments ||
                            deepSubItem?.allowedDepartments.includes(
                              personnel?.department
                            )
                        )
                        .map((deepSubItem) => ({
                          ...deepSubItem,
                          group: `${item.title} > ${subItem.title}`, // Group by parent and subItem title
                        }))
                    : []
                )
            : []
        )
        .flat();

      // Combine customer options with menu items
      const combinedOptions = [...customerOptions, ...groupedSubItems];

      return {
        label: "Ara",
        options: combinedOptions,
        getLabel: (option: OptionType) =>
          "name" in option
            ? option.name
            : "title" in option
            ? option.title
            : "",
        groupBy: (option: OptionType) => option.group, // Group by the "group" property
      };
    };

    const { label, options, getLabel, groupBy } = getSearchOptions();

    return (
      <Autocomplete
        style={
          theme
            ? { backgroundColor: "#2C2C2C", borderRadius: ".5rem" }
            : { backgroundColor: "white", borderRadius: ".5rem" }
        }
        popupIcon={null}
        options={options}
        getOptionLabel={getLabel}
        groupBy={groupBy} // Use groupBy for grouping
        onChange={(event, value) => {
          if (!value) return; // Handle case where value might be null or undefined
          if ("link" in value) {
            router.push(value.link); // Navigate to the link if available
          } else if ("name" in value) {
            handleCustomerSelect(event, value); // Handle customer selection
          }
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              // label={label}
              placeholder={label}
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          </>
        )}
        sx={{ width: 300 }}
      />
    );
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      slotProps={{
        paper: {
          sx: {
            width: "13rem",
            height: "15rem",
            borderRadius: "0.5rem",
            pt: ".5rem",
          },
        },
      }}
    >
      <MenuItem
        onClick={(e) => {
          router.push("/profile");
          handleMenuClose();
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
          }}
          color="primary"
        >
          {personnel?.avatar ? (
            <img
              src={personnel.avatar}
              alt="avatar"
              style={{ borderRadius: "50%", width: "30px" }}
            />
          ) : (
            personnel?.firstName?.charAt(0).toUpperCase()
          )}
        </Avatar>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "600", ml: 1 }}
        >{`${personnel?.firstName} ${personnel?.lastName}`}</Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Ayarlar
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push("/logout");
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Çıkış Yap
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {
            // on mobile mode
            window.innerWidth < 600 ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{ mr: 2, display: open ? "none" : "block" }}
                >
                  <MenuIcon />
                </IconButton>

                <Searcher />

                <IconButton
                  size="large"
                  color="inherit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotificationMenuOpen(e);
                  }}
                >
                  <Badge badgeContent={unreadNotifications} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{ mr: 2, display: open ? "none" : "block" }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap sx={{ flexGrow: 0.5 }}>
                  {(() => {
                    const hour = new Date().getHours();
                    if (hour < 12)
                      return `🌅 Günaydın, ${personnel?.firstName} ${personnel?.lastName} `;
                    if (hour < 18)
                      return `🌞 İyi günler, ${personnel?.firstName} ${personnel?.lastName}`;
                    return `🌜 İyi akşamlar, ${personnel?.firstName} ${personnel?.lastName}`;
                  })()}
                </Typography>
                <BreadcrumbComponent menuItems={menuItems} />
                <Searcher />

                <Box>
                  <IconButton
                    color="inherit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationMenuOpen(e);
                    }}
                  >
                    <Badge badgeContent={unreadNotifications} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Box>
                <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                  {personnel?.avatar ? (
                    <img
                      src={personnel.avatar}
                      alt="avatar"
                      style={{ borderRadius: "50%", width: "30px" }}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <ThemeSwitch
                  checked={theme}
                  onChange={toggleThemeWithStorage}
                />
              </>
            )
          }
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderNotifications()}
    </Box>
  );
}
