import React from 'react'

const ProductNotFound = ({ page }) => {
	return (
		<>
			<div className="flex flex-col items-center justify-center py-24 px-4 text-center">
				<div className="bg-gray-100 border border-gray-300 rounded-lg p-8 sm:p-12 max-w-md w-full shadow-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-16 w-16 mx-auto text-gray-400 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2">
						Product Not Found
					</h2>
					<p className="text-gray-500 mb-4">
						Sorry, the product you are looking for does not exist or may have
						been removed.
					</p>
					{
						page !== "home" && (
							<a
								href="/"
								className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
							>
								Go To Home
							</a>
						)
					}
				</div>
			</div>
		</>
	)
}

export default ProductNotFound