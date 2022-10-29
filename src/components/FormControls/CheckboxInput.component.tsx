import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import HelperText from "./helperText.component";

interface IProps {
    required?: boolean;
    label?: string;
    validate?: any;
    id: string;
    name?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
    readonly?: boolean;
    onEnter?: any;
    onFocus?: any;
    type: "checkbox" | "radio";
    checked?: boolean;
    value?: any;
    helperText?: string;
    isLoading?: boolean;
}

const CheckboxInput = (props: IProps) => {
    const { register, formState, setValue, getValues } = useFormContext();
    const target = useRef<any>(null);

    const isInvalid: "true" | "false" = Boolean(
        formState.isSubmitted && formState.errors[props.id]
    )
        ? "true"
        : "false";

    return (
        <div className="osCheckboxContainer">
            <input
                className="osInput"
                placeholder="Enter text"
                disabled={props.disabled || props.isLoading}
                readOnly={props.readonly}
                aria-invalid={isInvalid}
                type={props.type}
                id={props.id}
                // onKeyDown={(e) => {
                //     if (props.onEnter) {
                //         if (e.key === "Enter") {
                //             props.onEnter();
                //         }
                //     }
                // }}
                // onFocus={(e) => {
                //     if (!props.onFocus) return;
                //     props.onFocus(e);
                // }}
                {...register(props.id, {
                    required: props.required,
                    validate: props.validate,
                    // minLength: props.minLength,
                    // maxLength: props.maxLength,
                    shouldUnregister: true,
                })}
                name={props.id}
                value={props.value}
                checked={props.checked}
            />
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
    );
};

CheckboxInput.defaultProps = {
    required: false,
    label: "",
    type: "checkbox",
};

export default CheckboxInput;
