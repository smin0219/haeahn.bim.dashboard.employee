import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import Button from '@mui/material/Button';

function EmployeeSearchBar() {
    return (
        <Paper
            component="form"
            variant="outlined"
            elevation={0}
            sx={{ p: "2px 4px", margin: "4px", marginLeft: "400px", marginBottom: "7px", display: "flex", alignItems: "center", width: 300, height: 25}}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 12 }}
                placeholder="사원 검색"
                inputProps={{ "aria-label": "search employee" }}
            />
            <IconButton type="submit" fontSize="small" aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 15, m: 1 }} orientation="vertical" />
            <Button sx={{ height: 20, fontSize: 10 }} variant="contained" startIcon={<GroupIcon />}>
                팀 구성하기
            </Button>
        </Paper>
    );
}

export default EmployeeSearchBar;