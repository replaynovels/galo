import React from "react";
import { useFormContext } from "react-hook-form";
import Loader from "../loaders/loader.component";
import HelperText from "./helperText.component";

export interface IDropdownOptions {
    value: string;
    label: string;
    custom?: any;
}

interface IProps {
    label?: string;
    id: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    validate?: any;
    minLength?: number;
    maxLength?: number;
    onEnter?: () => void;
    onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    options?: IDropdownOptions[];
    helperText?: string;
    isLoading?: boolean;
}

const DropDownInput = (props: IProps) => {
    const { register, formState } = useFormContext();

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
            <select
                className="osInput"
                placeholder="Enter text"
                disabled={props.disabled || props.readOnly || props.isLoading}
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
            >
                {props.options?.map((option: IDropdownOptions) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    );
                })}
            </select>
            <Loader
                size="sm"
                loading={props.isLoading}
                className="osInputLoader"
            />
        </div>
    );
};

export default DropDownInput;
