import * as React from 'react';
import { FormikContext } from './types';
export declare const FormikProvider: React.ComponentClass<import("create-react-context").ProviderProps<FormikContext<any>>, any>, FormikConsumer: React.ComponentClass<import("create-react-context").ConsumerProps<FormikContext<any>>, any>;
export declare function connect<OuterProps, Values = {}>(Comp: React.ComponentType<OuterProps & {
    formik: FormikContext<Values>;
}>): React.ComponentType<OuterProps>;
