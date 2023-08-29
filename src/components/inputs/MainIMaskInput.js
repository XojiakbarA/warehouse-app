import {forwardRef} from "react";
import { IMaskInput } from "react-imask";


const MainIMaskInput = forwardRef((props, ref) => {
    const { onChange, ...others } = props;
    return (
        <IMaskInput
            { ...others }
            mask={"(00)-000-00-00"}
            inputRef={ref}
            onAccept={ (value) => onChange({ target: { name: props.name, value: value.replace(/[^0-9]/g,"") } }) }
        />
    )
})

export default MainIMaskInput