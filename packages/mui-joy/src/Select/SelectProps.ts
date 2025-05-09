import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { PopperUnstyledOwnProps } from '@mui/base/PopperUnstyled';
import { SelectOption, SelectUnstyledCommonProps } from '@mui/base/SelectUnstyled';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type { SelectOption } from '@mui/base/SelectUnstyled';

export type SelectSlot =
  | 'root'
  | 'button'
  | 'startDecorator'
  | 'endDecorator'
  | 'indicator'
  | 'listbox';

export interface SelectPropsVariantOverrides {}
export interface SelectPropsColorOverrides {}
export interface SelectPropsSizeOverrides {}

export type SelectSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SelectSlot,
  {
    root: SlotProps<'div', {}, SelectOwnerState<any>>;
    button: SlotProps<'button', {}, SelectOwnerState<any>>;
    startDecorator: SlotProps<'span', {}, SelectOwnerState<any>>;
    endDecorator: SlotProps<'span', {}, SelectOwnerState<any>>;
    indicator: SlotProps<'span', {}, SelectOwnerState<any>>;
    listbox: SlotProps<
      'ul',
      {
        color?: OverridableStringUnion<ColorPaletteProp, SelectPropsColorOverrides>;
        variant?: OverridableStringUnion<VariantProp, SelectPropsVariantOverrides>;
        size?: OverridableStringUnion<'sm' | 'md' | 'lg', SelectPropsSizeOverrides>;
      } & Omit<PopperUnstyledOwnProps, 'slots' | 'slotProps' | 'open'>,
      SelectOwnerState<any>
    >;
  }
>;

export interface SelectStaticProps extends SelectUnstyledCommonProps {
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<{
    focusVisible(): void;
  }>;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<ColorPaletteProp, SelectPropsColorOverrides>;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Trailing adornment for the select.
   */
  endDecorator?: React.ReactNode;
  /**
   * The indicator(*) for the select.
   *    ________________
   *   [ value        * ]
   *    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   */
  indicator?: React.ReactNode;
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose?: () => void;
  /**
   * Text to show when there is no selected value.
   */
  placeholder?: React.ReactNode;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', SelectPropsSizeOverrides>;
  /**
   * Leading adornment for the select.
   */
  startDecorator?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant?: OverridableStringUnion<VariantProp, SelectPropsVariantOverrides>;
}

export type SelectOwnProps<TValue extends {}> = SelectStaticProps &
  SelectSlotsAndSlotProps & {
    /**
     * The default selected value. Use when the component is not controlled.
     */
    defaultValue?: TValue | null;

    /**
     * A function to convert the currently selected value to a string.
     * Used to set a value of a hidden input associated with the select,
     * so that the selected value can be posted with a form.
     */
    getSerializedValue?: (
      option: SelectOption<TValue> | null,
    ) => React.InputHTMLAttributes<HTMLInputElement>['value'];
    /**
     * Callback fired when an option is selected.
     */
    onChange?: (
      e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
      value: TValue | null,
    ) => void;
    /**
     * Function that customizes the rendering of the selected value.
     */
    renderValue?: (option: SelectOption<TValue> | null) => React.ReactNode;
    /**
     * The selected value.
     * Set to `null` to deselect all options.
     */
    value?: TValue | null;
  };

export interface SelectOwnerState<TValue extends {}>
  extends ApplyColorInversion<SelectOwnProps<TValue>> {
  /**
   * If `true`, the select button is active.
   */
  active: boolean;
  /**
   * If `true`, the select button is disabled.
   */
  disabled: boolean;
  /**
   * If `true`, the select button's focus is visible.
   */
  focusVisible?: boolean;
  /**
   * If `true`, the select dropdown is open.
   */
  open: boolean;
}

export interface SelectTypeMap<TValue extends {}, P = {}, D extends React.ElementType = 'button'> {
  props: P & SelectOwnProps<TValue>;
  defaultComponent: D;
}

export type SelectProps<
  TValue extends {},
  D extends React.ElementType = SelectTypeMap<TValue>['defaultComponent'],
> = OverrideProps<SelectTypeMap<TValue, {}, D>, D> & {
  component?: D;
};
