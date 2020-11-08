import { css } from "styled-components";

const config = {
    gridSize: 12,
    paddingFluidDefault: 2,
    paddingDefault: 0.5,
    resolutions: ['xs', 'sm', 'md','cm','lg', 'xl'],
    containerMaxWidth: {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140,
    },    
    ModalMaxWidth: {
        large:{
            xs: 20,
            sm: 20,
            md: 45,
            lg: 65,
            xl: 85,
        },
        normal:{
            xs: 20,
            sm: 20,
            md: 30,
            lg: 40,
            xl: 40,
        }
    },
    viewport: {
        xs: 'only screen and (max-width: 47.99rem)',//smartphone
        sm: 'only screen and (min-width: 48rem) and (max-width: 63.99rem)', //standard tablets
        cm: 'only screen and (min-width: 64rem) and (max-width: 74.99rem)', //clasic monitor or xl tablets
        md: 'only screen and (min-width: 64rem)',//standard laptop
        lg: 'only screen and (min-width: 120rem)',//laptops or large monitors 
        xl: 'only screen and (min-width: 160rem)'//laptosp or extra large monitors 
    }
};

const media =  config.resolutions.reduce((media, breakpoint) => {
    media[breakpoint] = (...args) => {
        let mqCustom = breakpoint === 'cm' ? JSON.parse(JSON.stringify(args).replace(';',' !important;')) : args;
        return css`
            @media ${config.viewport[breakpoint]} {
                ${css(
                    ...mqCustom
                )}
            }
        `;
    }
    return media;
},{});
export default config;
export { media };