import { CollectionSize, Entity } from "../../../../models";
import { useTableStyles } from "../../Table/styles";

import React, { MouseEvent, useCallback } from "react";
import {
    Checkbox,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Skeleton,
    Tooltip,
    Typography
} from "@mui/material";
import { Delete, FileCopy, KeyboardTab, MoreVert } from "@mui/icons-material";

/**
 *
 * @param entity
 * @param isSelected
 * @param selectionEnabled
 * @param size
 * @param toggleEntitySelection
 * @param onCopyClicked
 * @param onEditClicked
 * @param onDeleteClicked
 * @constructor
 *
 * @category Collection components
 */
export function CollectionRowActions<M extends { [Key: string]: any }>({
                                                                           entity,
                                                                           isSelected,
                                                                           selectionEnabled,
                                                                           size,
                                                                           toggleEntitySelection,
                                                                           onCopyClicked,
                                                                           onEditClicked,
                                                                           onDeleteClicked
                                                                       }:
                                                                           {
                                                                               entity: Entity<M>,
                                                                               size: CollectionSize,
                                                                               isSelected?: boolean,
                                                                               selectionEnabled?: boolean,
                                                                               toggleEntitySelection?: (selectedEntity: Entity<M>) => void
                                                                               onEditClicked?: (selectedEntity: Entity<M>) => void,
                                                                               onCopyClicked?: (selectedEntity: Entity<M>) => void,
                                                                               onDeleteClicked?: (selectedEntity: Entity<M>) => void,
                                                                           }) {

    const editEnabled = Boolean(onEditClicked);
    const copyEnabled = Boolean(onCopyClicked);
    const deleteEnabled = Boolean(onDeleteClicked);

    const classes = useTableStyles();

    const [anchorEl, setAnchorEl] = React.useState<any | null>(null);

    const openMenu = useCallback((event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    }, [setAnchorEl]);

    const closeMenu = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const onCheckboxChange = (event: React.ChangeEvent) => {
        if (toggleEntitySelection)
            toggleEntitySelection(entity);
        event.stopPropagation();
    };

    const onDeleteClick = useCallback((event: MouseEvent) => {
        event.stopPropagation();
        if (onDeleteClicked)
            onDeleteClicked(entity);
        setAnchorEl(null);
    }, [entity, onDeleteClicked, setAnchorEl]);

    const onCopyClick = useCallback((event: MouseEvent) => {
        event.stopPropagation();
        if (onCopyClicked)
            onCopyClicked(entity);
        setAnchorEl(null);
    }, [entity, onCopyClicked, setAnchorEl]);

    return (
        <div className={classes.cellButtonsWrap}>

            {(editEnabled || deleteEnabled || selectionEnabled) &&
            <div className={classes.cellButtons}
            >
                {editEnabled &&
                <Tooltip title={`Edit ${entity.id}`}>
                    <IconButton
                        onClick={(event: MouseEvent) => {
                            event.stopPropagation();
                            if (onEditClicked)
                                onEditClicked(entity);
                        }}
                        size="large">
                        <KeyboardTab/>
                    </IconButton>
                </Tooltip>
                }

                {selectionEnabled &&
                <Tooltip title={`Select ${entity.id}`}>
                    <Checkbox
                        checked={isSelected}
                        onChange={onCheckboxChange}
                    />
                </Tooltip>}

                {(copyEnabled || deleteEnabled) &&
                <IconButton onClick={openMenu} size="large">
                    <MoreVert/>
                </IconButton>
                }

                {(copyEnabled || deleteEnabled) && <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                    elevation={2}
                >
                    {deleteEnabled && <MenuItem onClick={onDeleteClick}>
                        <ListItemIcon>
                            <Delete/>
                        </ListItemIcon>
                        <ListItemText primary={"Delete"}/>
                    </MenuItem>}

                    {copyEnabled && <MenuItem onClick={onCopyClick}>
                        <ListItemIcon>
                            <FileCopy/>
                        </ListItemIcon>
                        <ListItemText primary="Copy"/>
                    </MenuItem>}

                </Menu>}


            </div>}

            {size !== "xs" && (
                <div className={classes.cellButtonsId}>

                    {entity
                        ? <Typography
                            className={"mono"}
                            variant={"caption"}
                            color={"textSecondary"}> {entity.id} </Typography>
                        : <Skeleton variant="text"/>
                    }
                </div>
            )}

        </div>
    );

}
