import React, { useState } from "react";
import humanizeDuration from "humanize-duration";
import getInputValue from "../../../util/getinputvalue.ts";

export const title = "Download Time Calculator"
export const description = "Calculate the amount of time it will take to transfer a file size with a given network speed"

const calculateTime = (speed: number, speedMeasurement: string, size: number, sizeMeasurement: string): string => {
	const finalize = (seconds: number): string => {
		return humanizeDuration(seconds * 1000, {
			round: true,
			conjunction: " and ",
			serialComma: false
		})
	}

	const calculateSpeed = (speed: number, speedMeasurement: string): number => {
		//if (speedMeasurement == "gbps") return speed * 1000

		console.log(speedMeasurement)

		switch (speedMeasurement) {
			case "MB/s":
				return speed * 8
			case "gbps":
				return speed * 1000
			case "GB/s":
				return speed * 8 * 1000
		}

		return speed
	}

	const calculateSize = (size: number, sizeMeasurement: string): number => {
		if (sizeMeasurement == "tb") return ((size * 8) * 1000)

		return (size * 8)
	}

	let seconds = (calculateSize(size, sizeMeasurement) / calculateSpeed(speed, speedMeasurement)) * 1000

	return finalize(seconds)
}

const DTC = () => {
	const [ speed, setSpeed ] = useState<number>()
	const [ speedMeasurement, setSpeedMeasurement ] = useState<string>("mbps")

	const [ size, setSize ] = useState<number>()
	const [ sizeMeasurement, setSizeMeasurement ] = useState<string>("gb")

	const [ calculatedSpeed, setCalculatedSpeed ] = useState<string>("Not calculated yet")

	const calc = () => {
		// console.log(size, sizeMeasurement, speed, speedMeasurement, (size! * 8))
		if (!size || !sizeMeasurement || !speed || !speedMeasurement) return

		setCalculatedSpeed(calculateTime(speed, speedMeasurement, size, sizeMeasurement))
	}

	return (
		<>
			<div className={"flex flex-wrap gap-3"}>
				<div className="flex w-full shrink-0 grow flex-col rounded-xl border-2 border-slate-200 p-5 lg:basis1/3 xl:basis-1/4">
					<h3 className=" text-2xl font-bold leading-tight tracking-tighter mb-5">Speed</h3>
					<div className={"flex flex-row gap-6 justify-between"}>
						<div className={"w-full"}>
							<input
								type={"number"}
								id={"speed-input"}
								className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
								placeholder={"30"}
								onChange={(c) => {
									setSpeed(getInputValue(c))
								}}
							/>
						</div>
						<div>
							<select
								className={"flex w-24 h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
								onChange={(c) => {
									setSpeedMeasurement(getInputValue(c))
								}}
							>
								<option value={"mbps"}>Mbps</option>
								<option value={"MB/s"}>MB/s</option>
								<option value={"gbps"}>Gbps</option>
								<option value={"GB/s"}>GB/s</option>
							</select>
						</div>
					</div>
				</div>

				<div className="flex w-full shrink-0 grow flex-col rounded-xl border-2 border-slate-200 p-5 lg:basis1/3 xl:basis-1/4">
					<h3 className=" text-2xl font-bold leading-tight tracking-tighter mb-5">File size</h3>
					<div className={"flex flex-row gap-6 justify-between"}>
						<div className={"w-full"}>
							<input
								type={"number"}
								id={"size-input"}
								className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
								placeholder={"128"}
								onChange={(c) => {
									setSize(getInputValue(c))
								}}
							/>
						</div>
						<div>
							<select
								className={"flex w-24 h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
								onChange={(c) => {
									setSizeMeasurement(getInputValue(c))
								}}
							>
								<option value={"gb"}>GB</option>
								<option value={"tb"}>TB</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<p className="text-xl font-medium leading-tight tracking-tighter sm:text-xl md:text-2xl lg:text-3xl">
				Time - {calculateTime(speed!, speedMeasurement, size!, sizeMeasurement)}
			</p>
		</>
	)
}

export default DTC