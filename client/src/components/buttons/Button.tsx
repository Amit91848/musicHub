import * as React from 'react'
import { IconType } from 'react-icons'
import { ImSpinner2 } from 'react-icons/im'

import clsxm from '@/lib/clsxm'

import { service } from '@/constant/services'

const ButtonVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const
const ButtonSize = ['sm', 'base'] as const

type ButtonProps = {
    isLoading?: boolean
    isDarkBg?: boolean
    variant?: typeof ButtonVariant[number]
    size?: typeof ButtonSize[number]
    leftIcon?: IconType
    rightIcon?: IconType
    leftIconClassName?: string
    source: service
    rightIconClassName?: string
} & React.ComponentPropsWithRef<'button'>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            disabled: buttonDisabled,
            isLoading,
            variant = 'primary',
            size = 'base',
            source,
            // isDarkBg = false,
            leftIcon: LeftIcon,
            rightIcon: RightIcon,
            leftIconClassName,
            rightIconClassName,
            ...rest
        },
        ref
    ) => {
        const disabled = isLoading || buttonDisabled

        return (
            <button
                ref={ref}
                type='button'
                disabled={disabled}
                className={clsxm(
                    'inline-flex items-center rounded-lg font-medium transition duration-300',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
                    'shadow-sm',
                    'py-3 px-5 transition-colors duration-75',
                    [size === 'base' && ['text-sm']],
                    [
                        variant === 'outline' && [
                            'border text-light transition duration-300 hover:text-white disabled:border-gray-700 disabled:bg-transparent',
                            source === 'spotify' &&
                                'border-green-600  bg-green-600/20 hover:bg-green-600/30',
                            source === 'youtube' &&
                                'border-red-600 bg-red-700/10 hover:bg-red-700/20',
                            source === 'soundcloud' &&
                                'border-orange-600 bg-orange-700/20 hover:bg-orange-700/30',
                        ],
                    ],
                    //#endregion  //*======== Variants ===========
                    'disabled:cursor-not-allowed',
                    isLoading &&
                        'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
                    className
                )}
                {...rest}
            >
                {isLoading && (
                    <div
                        className={clsxm(
                            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                            {
                                'text-white': ['primary', 'dark'].includes(
                                    variant
                                ),
                                'text-black': ['light'].includes(variant),
                                'text-primary-500': [
                                    'outline',
                                    'ghost',
                                ].includes(variant),
                            }
                        )}
                    >
                        <ImSpinner2 className='animate-spin' />
                    </div>
                )}
                {LeftIcon && (
                    <div className={clsxm([size === 'base' && 'mr-4'])}>
                        <LeftIcon
                            className={clsxm(
                                [size === 'base' && 'text-xl '],
                                leftIconClassName
                            )}
                        />
                    </div>
                )}
                {children}
                {RightIcon && (
                    <div
                        className={clsxm([
                            size === 'base' && 'ml-1',
                            size === 'sm' && 'ml-1.5',
                        ])}
                    >
                        <RightIcon
                            className={clsxm(
                                [
                                    size === 'base' && 'text-md md:text-md',
                                    size === 'sm' && 'md:text-md text-sm',
                                ],
                                rightIconClassName
                            )}
                        />
                    </div>
                )}
            </button>
        )
    }
)

export default Button
