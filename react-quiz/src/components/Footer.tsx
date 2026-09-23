import type { PropsWithChildren } from "react"

function Footer({ children }: PropsWithChildren) {
    return <footer className="footer">{children}</footer>
}

export default Footer
