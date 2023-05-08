
import { AiOutlineStar} from 'react-icons/ai';
import { TfiAgenda} from 'react-icons/tfi';
import { BsShare} from 'react-icons/bs';
import { BiHomeAlt2} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

export default function Navbar() {

    return(<div className='icons_nav'>

<Link to="/PaginaHome"><BiHomeAlt2/> </Link>
<Link to="/PaginaFavoritos"><AiOutlineStar/></Link>
<Link to="/PaginaDiario"><TfiAgenda/></Link>
<Link to="/compartir"><BsShare/></Link>
</div>

    )
}