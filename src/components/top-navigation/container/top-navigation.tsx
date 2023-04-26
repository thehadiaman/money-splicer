export default function TopNavigationContainer(props: any) {

    return (
        <section className={"topnav"}>
            {
                props.navMenu.map(
                    (navItem: any) => {
                        /**
                         * Link --- START
                         */
                        if (navItem['type'] === 'link')
                            return <a
                                key={navItem['displayName']}
                                className={navItem['status']}
                                href={navItem['link']}>
                                {navItem['displayName']}
                            </a>
                        /**
                         * Link --- END
                         */

                        /**
                         * Drop Down --- START
                         */
                        else if (navItem['type'] === 'dropdown')
                            return <div className={"dropdown"}
                                key={"drop-down"}
                                style={{ float: navItem['position'] }}>
                                <a href="#0">
                                    {navItem['btnName']}
                                    <i className={"fa fa-caret-down"}></i>
                                </a>
                                <div className={"dropdown-content"}>
                                    {
                                        navItem['items'].map(
                                            (item: any) => {
                                                return <a href={'#'+item['displayName']} key={item['displayName']} onClick={() => item['onClick']()}>
                                                    {item['displayName']}
                                                </a>
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        /**
                         * Drop Down --- END
                         */
                        else
                            return <div></div>
                    }
                )
            }
        </section >
    );
}