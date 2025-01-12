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
} from "@mui/material";
import { handleLogout, getPersonnelInfo } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import menuItems from "./main/menu/menuItems.json";
interface PrimaryAppBarProps {
  toggleDrawer: () => void;
  toggleTheme: () => void;
  open: boolean;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<true | false>>;
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

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [customers, setCustomers] = React.useState<
    { id: string; name: string }[]
  >([]);
  const router = useRouter();

  const personnel = getPersonnelInfo();
  React.useEffect(() => {
    fetch("/api/customer")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data || []);
      })
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const toggleThemeWithStorage = () => {
    const newTheme = theme === true ? false : true;
    setTheme(newTheme);
    toggleTheme();
    localStorage.setItem("darkMode", JSON.stringify(newTheme));
  };

  const handleCustomerSelect = (event: any, value: { id: string } | null) => {
    if (value) {
      router.push(`/customer/view/?id=${value.id}`);
    }
  };

  const isMenuOpen = Boolean(anchorEl);
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
                  (subItem.subItems || [])
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
          theme ? { backgroundColor: "#2C2C2C" } : { backgroundColor: "white" }
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
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          router.push("/profile");
          handleMenuClose();
        }}
      >
        Profil
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push("/logout");
        }}
      >
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
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                  {(() => {
                    const hour = new Date().getHours();
                    if (hour < 12)
                      return `🌅 Günaydın, ${personnel?.firstName} ${personnel?.lastName} `;
                    if (hour < 18)
                      return `🌞 İyi günler, ${personnel?.firstName} ${personnel?.lastName}`;
                    return `🌜 İyi akşamlar, ${personnel?.firstName} ${personnel?.lastName}`;
                  })()}
                </Typography>

                <Searcher />

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
    </Box>
  );
}
