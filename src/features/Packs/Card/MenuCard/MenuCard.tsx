import React from 'react'

import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import learn from 'assets/icons/teacher.svg'
import { PATH } from 'common/path/path'
import { DeletePackModal } from 'features/Modal/PackModal/DeletePackModal'
import { EditPackModal } from 'features/Modal/PackModal/EditPackModal'

type MenuPropsType = {
  anchorEl: null | HTMLElement
  setAnchorEl: (anchorEl: null | HTMLElement) => void
  redirectToLearn: () => void
  packName: string
  packPrivate: boolean
  packId: string
  packDeckCover: string
  isEmptyPack: boolean
}
export const MenuCard: React.FC<MenuPropsType> = React.memo(
  ({ anchorEl, setAnchorEl, redirectToLearn, packName, packPrivate, packId, packDeckCover, isEmptyPack }) => {
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const closeHandler = () => {
      setAnchorEl(null)
    }
    const redirectToPacksHandler = () => {
      navigate(PATH.PACKS.PACKS)
    }

    return (
      <>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={closeHandler}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <EditPackModal
            packDeckCover={packDeckCover}
            onClose={closeHandler}
            nameProp={packName}
            privateProp={packPrivate}
            packId={packId}
            menuName="Edit"
          />
          <DeletePackModal
            redirectToPacks={redirectToPacksHandler}
            onClose={closeHandler}
            packId={packId}
            packName={packName}
            menuName="Delete"
          />
          <MenuItem disabled={isEmptyPack} onClick={redirectToLearn}>
            <ListItemIcon>
              <img src={learn} alt="learn icon" />
            </ListItemIcon>
            Learn
          </MenuItem>
        </Menu>
      </>
    )
  }
)
