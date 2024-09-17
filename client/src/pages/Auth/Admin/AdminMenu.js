import { NavLink } from 'react-router-dom'
import { NavLinkArray } from './NavBarCmponent';
export default function AdminMenue() {
  
  return (
    <div className="sidebar-container">
      <ul className="list-group">
        <li className="list-group-item disabled">
          <h3>Admin Panel</h3>
        </li>
        {/* Using Array for NavLing */}
        {NavLinkArray.map((item)=>{
          return(
             <li className="list-group-item">
          <NavLink to={item.path} className="nav-link" activeClassName="active">
            {item.name}
          </NavLink>
        </li>
          )
        })}
       
        
      </ul>
    </div>
  );
}
