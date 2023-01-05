// change to styled-components
// import "./form-input.styles.scss";
import { GroupContainer, Input, FormInputLabel } from "./form-input.styles";

function FormInput({ label, ...otherProps }) {
  return (
    <GroupContainer>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </GroupContainer>
  );
}

export default FormInput;
