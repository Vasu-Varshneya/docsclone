import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Users, Lock, Zap, Cloud, Menu } from "lucide-react"
import { Link } from 'react-router-dom'
const About = () => {
    return (
        <>
            <section className="w-full  py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <Lock className="h-12 w-12 text-blue-500" />
                            <h3 className="text-xl font-bold">Advanced Security</h3>
                            <p className="text-gray-500 dark:text-gray-400">Keep your documents safe with our state-of-the-art security measures.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <Zap className="h-12 w-12 text-blue-500" />
                            <h3 className="text-xl font-bold">Smart Formatting</h3>
                            <p className="text-gray-500 dark:text-gray-400">Powerful formatting tools to make your documents look professional.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <Menu className="h-12 w-12 text-blue-500" />
                            <h3 className="text-xl font-bold">Version History</h3>
                            <p className="text-gray-500 dark:text-gray-400">Track changes and revert to previous versions with ease.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <FileText className="h-12 w-12 text-blue-500" />
                            <h3 className="text-xl font-bold">Multiple File Formats</h3>
                            <p className="text-gray-500 dark:text-gray-400">Import and export documents in various formats, including PDF and Word.</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 DocClone. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link to="#" className="text-xs hover:underline underline-offset-4">
                        Terms of Service
                    </Link>
                    <Link to="#" className="text-xs hover:underline underline-offset-4">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </>
    )
}

export default About
