import { IButton, IButtonGroup } from "../interfaces";

function openCity(cityName: any): void {

}
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
                            buttonStyle['background-color'] = button.backgroundColor;

                        return <section>
                            <button
                                style={buttonStyle}
                                onClick={() => button.onClick ? button.onClick() : null}
                            >
                                {button.name}
                            </button>
                            {
                                !!spacing?
                                <div style={{ width: `${spacing}%` }} className={"btn-hide"}></div>:
                                ""
                            }
                        </section>
                    }
                )
            }
        </div>
    );
}