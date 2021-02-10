import React from 'react'
import Wheather from './Wheather'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

test("Wheather render", async () => {
    // AAA Arrange Act Assert
    const { findByRole } = render(<Wheather temperature={10} />)

    const temp = await findByRole("heading")

    expect(temp).toHaveTextContent("10")

})