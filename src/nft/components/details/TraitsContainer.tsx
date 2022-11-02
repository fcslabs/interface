import { GenieAsset, Trait } from 'nft/types'
import qs from 'query-string'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const GridItemContainer = styled(Link)`
  background-color: ${({ theme }) => theme.backgroundInteractive};
  border-radius: 12px;
  cursor: pointer;
  padding: 12px;
  text-decoration: none;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.hover};
  }

  &:active {
    opacity: ${({ theme }) => theme.opacity.click};
  }

  transition: ${({
    theme: {
      transition: { duration, timing },
    },
  }) => `opacity ${duration.medium} ${timing.ease}`};
`

const TraitType = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
`

const TraitValue = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 12px;
  line-height: 24px;
  margin-top: 4px;
`

const GridItem = ({ trait: { trait_type, value }, collectionAddress }: { trait: Trait; collectionAddress: string }) => {
  const params = qs.stringify(
    { traits: [`("${trait_type}","${value}")`] },
    {
      arrayFormat: 'comma',
    }
  )

  return (
    <GridItemContainer to={`/nfts/collection/${collectionAddress}?${params}`}>
      <TraitType>{trait_type}</TraitType>
      <TraitValue>{value}</TraitValue>
    </GridItemContainer>
  )
}

const TraitsContainer = ({ asset }: { asset: GenieAsset }) => {
  const traits = useMemo(() => asset.traits?.sort((a, b) => a.trait_type.localeCompare(b.trait_type)), [asset])

  return (
    <Grid>
      {traits?.map((trait) => {
        return <GridItem key={trait.trait_type} trait={trait} collectionAddress={asset.address} />
      })}
    </Grid>
  )
}

export default TraitsContainer