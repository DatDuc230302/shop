import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './DefaultLayoutAdmin.module.scss';

const cx = classNames.bind(style);
export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <Link to={'/admin/home'} className={cx('list-item')}>
                Dashboard
            </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <Link to={'/admin/manage-users'} className={cx('list-item')}>
                Manage Users
            </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <Link to={'/admin/manage-products'} className={cx('list-item')}>
                Manage Products
            </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <Link to={'/admin/manage-products'} className={cx('list-item')}>
                Reports
            </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <Link to={'/admin/manage-product/edit-product'} className={cx('list-item')}>
                Edit Product
            </Link>
        </ListItemButton>
    </React.Fragment>
);
