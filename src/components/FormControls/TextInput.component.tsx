import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import Loader from "../loaders/loader.component";
import HelperText from "./helperText.component";

interface IProps {
    required?: boolean;
    label?: string;
    validate?: any;
    id: string;
    name?: string;
    placeholder?: string;
    type?: string;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
    readonly?: boolean;
    onEnter?: any;
    onFocus?: any;
    value?: any;
    helperText?: string;
    isLoading?: boolean;
}

const TextInput = (props: IProps) => {
    const { register, formState, setValue, getValues } = useFormContext();
    const target = useRef<any>(null);

    const isInvalid: "true" | "false" = Boolean(
        formState.isSubmitted && formState.errors[props.id]
    )
        ? "true"
        : "false";

    return (
        <div className="osInputContainer">
            {(props.label || props.helperText) && (
                <div className="d-flex flex-row align-items-center">
                    {props.label && (
                        <label
                            aria-invalid={isInvalid}
                            htmlFor={props.id}
                            className="osInputLabel"
                        >
                            {props.label}
                        </label>
                    )}
                    {props.helperText && (
                        <HelperText id={props.id} text={props.helperText} />
                    )}
                </div>
            )}
            <input
                type="text"
                className="osInput"
                placeholder={props.placeholder}
                disabled={props.disabled || props.isLoading}
                readOnly={props.readonly}
                aria-invalid={isInvalid}
                onKeyDown={(e) => {
                    if (props.onEnter) {
                        if (e.key === "Enter") {
                            props.onEnter();
                        }
                    }
                }}
                onFocus={(e) => {
                    if (!props.onFocus) return;
                    props.onFocus(e);
                }}
                {...register(props.id, {
                    required: props.required,
                    validate: props.validate,
                    minLength: props.minLength,
                    maxLength: props.maxLength,
                    shouldUnregister: true,
                })}
                value={props.value}
                name={props.id}
            />
            <Loader
                size="sm"
                loading={props.isLoading}
                className="osInputLoader"
            />
        </div>
    );
};

TextInput.defaultProps = {
    required: false,
    label: "",
};

export default TextInput;
