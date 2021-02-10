import React from 'react'
import { render } from '@testing-library/react'
import CityInfo from './CityInfo'

test("CityInfo render", async () => {
    //  AAA = Arrange, Act and Assert

    const city = "Lima"
    const country = "Perú"
    const { findAllByRole } = render(<CityInfo city={city} country={country}></CityInfo>)

    const cityAndCountryComponents = await findAllByRole("heading")

    // Cuando el test va a ser correcto?
    expect(cityAndCountryComponents[0]).toHaveTextContent(city)
    expect(cityAndCountryComponents[1]).toHaveTextContent(country)
    expect(cityAndCountryComponents.length).toBe(2)

})