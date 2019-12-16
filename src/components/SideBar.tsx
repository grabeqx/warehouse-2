import React, {useContext} from 'react';
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

import {drawerWidth} from '../config/config';
import {AppContext} from '../AppContext';
import {TMenuItem} from '../types/types';
import {appMainPath} from '../config/config';

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    linkItem: {
        textDecoration: 'none',
        color: '#000'
    }
}));

const SideBar = (props: {menuItems: TMenuItem[]}) => {
    const classes = useStyles();

    const { state, dispatch } = useContext(AppContext);

    const handleDrawerClose = () => {
        dispatch({
            type: 'SET_DRAWER_CLOSED',
            payload: {
                drawerOpened: false
            }
        })
    };
    return (
        <Drawer variant="permanent" classes={{
            paper: clsx(classes.drawerPaper, !state.drawerOpened && classes.drawerPaperClose)
        }}>
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                {props.menuItems.map((item, index) => {
                    const Icon = item.iconComponent;
                    return (
                        <Link key={index} to={`${appMainPath}${item.url}`} className={classes.linkItem}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
        </Drawer>
    )
};

export default SideBar;