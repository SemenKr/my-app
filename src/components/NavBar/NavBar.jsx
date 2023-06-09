import React from 'react';
import nav from './NavBar.module.css';
import NavMenuItem from './NavMenu/NavMenu';
import Friend from './Friends/Friends';


const NavBar = (props) => {

	const state = props.state;
	const links = state.navMenu.links.map(link => <li key={link.id} className={nav.navigation__item}><NavMenuItem name={link.name}
		path={link.path} />
	</li>);
	const friends = state.navMenu.users.map(friend => <li key={friend.id} className={nav.friends__item}><Friend name={friend.name}
		src={friend.src}
		alt={friend.alt} /></li>)


	return (
		<div className={nav.navBar}>
			<nav className={`${nav.navBar__navigation} ${nav.navigation}`}>
				<ul className={nav.navigation__list}>
					{links}
				</ul>
			</nav>
			<div className={`${nav.navBar__friends} ${nav.friends}`}>
				<ul className={nav.friends__list}>
					{friends}
				</ul>
			</div>

		</div>
	)
};

export default NavBar;
