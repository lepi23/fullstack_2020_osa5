import React, { useReducer } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
describe('<Blog />', () => {

    let component
    const blog = {
        author: 'ronja',
        title: 'en mun mielestä',
        url:'www...',
        likes:0
    }
    beforeEach(() => {
        component = render(
            <  Blog blog={blog} />
        )

    })


    test('renders author and title but not likes and url', () => {

        expect(component.container).toHaveTextContent(
            'ronja'
        )
        expect(component.container).toHaveTextContent(
            'en mun mielestä'
        )
        expect(component.container).not.toHaveTextContent(
            'www...'
        )
        expect(component.container).not.toHaveTextContent(
            0
        )
    })

    test('renders also likes and url after "show" button is clicked', () => {
        const button = component.getByText('show')
        fireEvent.click(button)
        expect(component.container).toHaveTextContent(
            'ronja'
        )
        expect(component.container).toHaveTextContent(
            'en mun mielestä'
        )
        expect(component.container).toHaveTextContent(
            'www...'
        )
        expect(component.container).toHaveTextContent(
            0
        )
    })
})