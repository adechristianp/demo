/** @jsxImportSource @emotion/react */
import GrassIcon from '@mui/icons-material/Grass';
import AdjustIcon from '@mui/icons-material/Adjust';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BugReportIcon from '@mui/icons-material/BugReport';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WavesIcon from '@mui/icons-material/Waves';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import { ReactNode } from 'react';

const IconWrapper = ({ children, color }: { children: ReactNode, color: string }) =>
  <div css={{
    backgroundColor: color,
    borderRadius: '50% 50%',
    color: 'white',
    display: 'flex',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    {children}
  </div>

export default function PokemonType({ name }: { name: string }) {

  switch (name) {
    case 'normal': return <IconWrapper color='grey'><AdjustIcon /></IconWrapper>
    case 'figthing': return <IconWrapper color='orange'><SportsMmaIcon /></IconWrapper>
    case 'flying': return <IconWrapper color='grey'><SportsMmaIcon /></IconWrapper>
    case 'poison': return <IconWrapper color='purple'><CoronavirusIcon /></IconWrapper>
    case 'ground': return <IconWrapper color='brown'><SportsMmaIcon /></IconWrapper>
    case 'rock': return <IconWrapper color='grey'><SportsMmaIcon /></IconWrapper>
    case 'bug': return <IconWrapper color='green'><BugReportIcon /></IconWrapper>
    case 'ghost': return <IconWrapper color='grey'><SportsMmaIcon /></IconWrapper>
    case 'steel': return <IconWrapper color='darkgrey'><SportsMmaIcon /></IconWrapper>
    case 'fire': return <IconWrapper color='red'><LocalFireDepartmentIcon /></IconWrapper>
    case 'water': return <IconWrapper color='lightblue'><WavesIcon /></IconWrapper>
    case 'grass': return <IconWrapper color='green'><GrassIcon /></IconWrapper>
    case 'electric': return <IconWrapper color='yellow'><ElectricBoltIcon /></IconWrapper>
    case 'psychic': return <IconWrapper color='green'><GrassIcon /></IconWrapper>
    case 'ice': return <IconWrapper color='lightblue'><AcUnitIcon /></IconWrapper>
    case 'dragon': return <IconWrapper color='red'><GrassIcon /></IconWrapper>
    case 'dark': return <IconWrapper color='black'><Brightness3Icon /></IconWrapper>
    case 'fairy': return <IconWrapper color='lightyellow'><FavoriteBorderIcon /></IconWrapper>
    case 'shadow': return <IconWrapper color='darkgrey'><SmartToyIcon /></IconWrapper>
    default: return <div />
  }
}
