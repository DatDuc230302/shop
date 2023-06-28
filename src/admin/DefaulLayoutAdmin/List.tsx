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
            <Link to={'/admin/home'} className={cx('list-item')}>
                <DashboardIcon />
                Dashboard
            </Link>
        </ListItemButton>
        <ListItemButton>
            <Link to={'/admin/manage-users'} className={cx('list-item')}>
                <ShoppingCartIcon />
                Manage Users
            </Link>
        </ListItemButton>
        <ListItemButton>
            <Link to={'/admin/manage-products'} className={cx('list-item')}>
                <PeopleIcon />
                Manage Products
            </Link>
        </ListItemButton>
        <ListItemButton>
            <Link to={'/admin/manage-products'} className={cx('list-item')}>
                <BarChartIcon />
                Reports
            </Link>
        </ListItemButton>
        <ListItemButton>
            <Link to={'/admin/manage-product/edit-product'} className={cx('list-item')}>
                <LayersIcon />
                Edit Product
            </Link>
        </ListItemButton>
    </React.Fragment>
);
