import { IButton, IButtonGroup } from "../interfaces";

export default function ButtonGroupContainer({buttons, spacing}: IButtonGroup) {

    
    return (
        <div className={"btn-group"} style={{ width: '100%' }}>
            {
                buttons.map(
                    (button: IButton) => {
                        const buttonStyle: any = { width: `${(100 - ((buttons.length - 1) * (spacing || 0))) / buttons.length}%` }

                        if(button['color'])
                            buttonStyle.color = button.color;
                        if(button['backgroundColor'])
                            buttonStyle['backgroundColor'] = button.backgroundColor;
                        return <section key={button.name}>
                            <button
                                style={buttonStyle}
                                key={button.name+'btn'}
                                type={button.type}
                                onClick={() => button.onClick ? button.onClick() : null}
                            >
                                {button.name}
                            </button>
                            {
                                !!spacing?
                                <div key={button.name+'spacing'} style={{ width: `${spacing}%` }} className={"btn-hide"}></div>:
                                ""
                            }
                        </section>
                    }
                )
            }
        </div>
    );
}