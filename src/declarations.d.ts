declare module '*.scss';

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}


declare module 'draftjs-utils';

declare module 'react-step-wizard' {
  export type StepWizardProps = Partial<{
    className: string;

    hashKey: string;
    initialStep: number;
    instance: (wizard: StepWizardProps) => void;
    isHashEnabled: boolean;
    isLazyMount: boolean;
    nav: JSX.Element;

    onStepChange: (stepChange: {
      previousStep: number;
      activeStep: number;
    }) => void;

    transitions: {
      enterRight?: string;
      enterLeft?: string;
      exitRight?: string;
      exitLeft?: string;
    };

    children: JSX.Element[];
  }>;

  export type StepWizardChildProps<T extends Record<string, any> = {}> = {
    isActive: boolean;
    currentStep: number;
    totalSteps: number;
    firstStep: () => void;
    lastStep: () => void;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (step: number) => void;
    hashKey?: string;
  } & T;

  export function StepWizard(props: StepWizardProps): JSX.Element;
  export default StepWizard;
}

declare module 'scroll-into-view';
