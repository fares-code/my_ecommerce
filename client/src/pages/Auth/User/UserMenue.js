import { NavLink } from 'react-router-dom'
import { UserNavLink } from './UserNavlink' 
export default function UserMenue (){
    return (
        <div className="sidebar-container">
      <ul className="list-group">
        <li className="list-group-item disabled">
          <h3>User Panel</h3>
        </li>
        {
UserNavLink.map((item)=>{
  return(
      <li className="list-group-item">
          <NavLink to={item.path} className="nav-link" activeClassName="active">
            {item.name}
          </NavLink>
        </li>
      
  )
})
        }
      
      </ul>
    </div>
    )
}