import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useNavigate, useParams } from 'react-router-dom'

import s from './Card.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'
import info from 'assets/icons/info.svg'
import defaultCover from 'assets/images/defaultCover.jpg'
import { ArrowBackToPacks } from 'common/components/ArrowBackToPacks/ArrowBackToPacks'
import { Filters } from 'common/components/Filters/Filters'
import { Search } from 'common/components/Search/Search'
import { SuperPaginationTable } from 'common/components/SuperPaginationTable/SuperPaginationTable'
import { common_button } from 'common/styles/LoginStyles'
import { AddCardModal } from 'features/Modal/CardsModal/AddCardModal'
import { getCards, resetPackDeckCover, setCount, setPage, setSearch, setSort } from 'features/Packs/Card/card-reducer'
import { CardBody } from 'features/Packs/Card/CardParts/CardBody'
import { CardHeader } from 'features/Packs/Card/CardParts/CardHeader'
import { EmptyPack } from 'features/Packs/Card/CardParts/EmptyPack'
import {
  selectCardPage,
  selectCardPageCount,
  selectCards,
  selectCardSearch,
  selectCardSort,
  selectCardsTotalCount,
  selectPackDeckCover,
  selectPackName,
  selectPackPrivate,
  selectPackUserId,
} from 'features/Packs/Card/CardSelectors'
import { MenuCard } from 'features/Packs/Card/MenuCard/MenuCard'
import { selectUserId } from 'features/Profile/profileSelectors'

export const Cards = () => {
  const dispatch = useAppDispatch()

  const { packId } = useParams<{ packId: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const navigate = useNavigate()

  const cards = useAppSelector(selectCards)
  const page = useAppSelector(selectCardPage)
  const pageCount = useAppSelector(selectCardPageCount)
  const cardsTotalCount = useAppSelector(selectCardsTotalCount)
  const packName = useAppSelector(selectPackName)
  const sort = useAppSelector(selectCardSort)
  const search = useAppSelector(selectCardSearch)
  const userId = useAppSelector(selectUserId)
  const packUserId = useAppSelector(selectPackUserId)
  const packDeckCover = useAppSelector(selectPackDeckCover)
  const packPrivate = useAppSelector(selectPackPrivate)

  const isMyPack = userId === packUserId
  const isEmptyPack = !cards.length

  console.log('asda ' + isEmptyPack)

  useEffect(() => {
    packId && dispatch(getCards(packId))
  }, [page, pageCount, sort, search])

  useEffect(() => {
    return () => {
      dispatch(setSearch(''))
      dispatch(setSort(''))
      dispatch(resetPackDeckCover())
    }
  }, [])
  const changePaginationHandler = (newPage: number, newCount: number = 5) => {
    dispatch(setPage(newPage))
    dispatch(setCount(newCount))
  }
  const searchHandler = (search: string) => dispatch(setSearch(search))

  const openMenuHandler = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const redirectToLearnHandler = () => {
    navigate('/learn/' + packId)
  }

  return (
    <TableContainer className={s.container}>
      <ArrowBackToPacks />
      <div className={s.packName}>
        <p className={s.packNameText}>
          {packName}
          {isMyPack && <img onClick={openMenuHandler} src={info} alt="info" style={{ cursor: 'pointer' }} />}
        </p>
        {packId && (
          <MenuCard
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            packName={packName}
            packPrivate={packPrivate}
            packId={packId}
            redirectToLearn={redirectToLearnHandler}
            packDeckCover={packDeckCover}
            isEmptyPack={isEmptyPack}
          />
        )}
        {!isEmptyPack && !isMyPack && (
          <Button sx={common_button} variant={'contained'} color={'primary'} onClick={redirectToLearnHandler}>
            Learn to pack
          </Button>
        )}
        {!isEmptyPack && isMyPack && <AddCardModal packId={packId} />}
      </div>

      {isEmptyPack ? (
        <EmptyPack packId={packId} />
      ) : (
        <>
          <img className={s.packDeckCover} src={packDeckCover || defaultCover} alt="pack deck cover" />
          <Filters>
            <Search search={search} onChange={searchHandler} />
          </Filters>
          <TableContainer className={'commonContainer'}>
            <TableContainer>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <Table sx={{ minWidth: 700, mt: 2 }} aria-labelledby="tableTitle">
                  <CardHeader isMyPack={isMyPack} />

                  <TableBody>
                    {cards.map(card => (
                      <CardBody key={card._id} card={card} isMyPack={isMyPack} />
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>

            <SuperPaginationTable
              page={page}
              itemsCount={pageCount}
              totalCount={cardsTotalCount}
              onChange={changePaginationHandler}
            />
          </TableContainer>
        </>
      )}
    </TableContainer>
  )
}
