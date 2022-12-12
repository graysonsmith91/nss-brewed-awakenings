import { getEmployees } from "./database.js"
import { getOrders } from "./database.js"

const employees = getEmployees()

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        html += `<li id="employee--${employee.id}">${employee.name}</li>`
    }

    html += "</ul>"

    return html
}


const orders = getOrders()

const employeeOrders = (employee) => {
    let fulfilledOrders = 0

    for (const order of orders) {
        if (order.employeeId === employee.id) {
            fulfilledOrders += 1
            // Increment the number of fulfilled orders
        }
    }

    return fulfilledOrders
    // Return how many orders were fulfilled
}


document.addEventListener(
    "click",
    (clickEvent) => {

        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("employee")) {

            const [,employeePrimaryKey] = itemClicked.id.split("--")

            for (const employee of employees) {
                if (employee.id === parseInt(employeePrimaryKey)) {

                    const orderCount = employeeOrders(employee)

                    window.alert(`${employee.name} sold ${orderCount} products`)
                }
            }
        }
    }
)