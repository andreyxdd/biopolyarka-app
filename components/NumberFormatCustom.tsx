import React from "react";
import NumberFormat from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<NumberFormat, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        placeholder="+7 (987) 654-32-10"
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isNumericString
        prefix="+7"
        format="+7 (###) ###-##-##"
        allowEmptyFormatting
        mask="_"
      />
    );
  }
);

export default NumberFormatCustom;
