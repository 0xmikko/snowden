import * as React from 'react';
import { FormikProps, GenericFieldHTMLAttributes, FormikContext } from './types';
export interface FastFieldProps<V = any> {
    field: {
        onChange: (e: React.ChangeEvent<any>) => void;
        onBlur: (e: any) => void;
        value: any;
        name: string;
    };
    form: FormikProps<V>;
}
export interface FastFieldConfig<T> {
    component?: string | React.ComponentType<FastFieldProps<any>> | React.ComponentType<void>;
    render?: ((props: FastFieldProps<any>) => React.ReactNode);
    children?: ((props: FastFieldProps<any>) => React.ReactNode) | React.ReactNode;
    validate?: ((value: any) => string | Promise<void> | undefined);
    shouldUpdate?: (nextProps: T & GenericFieldHTMLAttributes & {
        formik: FormikContext<any>;
    }, props: {}) => boolean;
    name: string;
    className?: string;
    type?: string;
    value?: any;
    innerRef?: (instance: any) => void;
}
export declare type FastFieldAttributes<T> = GenericFieldHTMLAttributes & FastFieldConfig<T> & T;
export declare const FastField: React.ComponentType<any>;
