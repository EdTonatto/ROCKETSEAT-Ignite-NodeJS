const express = require("express")
const {v4: uuidv4} = require("uuid")

const app = express()
app.use(express.json())
 
const customers = []

//Middleware
function verifyIfExistsAccountCPF(request, response, next){
    const {cpf} = request.params

    const customer = customers.find((customer) => customer.cpf === cpf)

    if(!customer)
        return response.status(400).json({error: "Customer not found!"})

    request.customer = customer

    return next()
}

function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === "credit")
            return acc + operation.amount
        else if (operation.type === "debit")
            return acc - operation.amount
    }, 0)

    return balance
}

app.post("/account", (request, response) => {
    const {cpf, name} = request.body 

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    )

    if(customerAlreadyExists)
        return response.status(400).json({error: "Customer already exists!"})

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send();
})

app.put("/account/:cpf", verifyIfExistsAccountCPF, (request, response) => {
    const {name} = request.body
    const {customer} = request

    customer.name = name

    return response.status(201).send()
})

app.delete("/account/:cpf", verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request

    customers.splice(customer, 1)

    return response.status(204).send()
})

app.get("/account/:cpf", verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request
    return response.json(customer)
})
// app.use(verifyIfExistsAccountCPF) //Pode chamar um middleware desta forma, sera aplicado para todos os endpoints seguintes a este comando.
app.get("/statement/:cpf", verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request
    return response.json(customer.statement)
})

app.post("/deposit/:cpf", verifyIfExistsAccountCPF, (request, response) => {
    const {description, amount} = request.body
    const {customer} = request

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit",
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

app.get("/statement/:cpf/date", verifyIfExistsAccountCPF, (request, response) => {
    const {date} = request.query
    const {customer} = request

    const dateFormat = new Date(date + " 00:00")
    const statement = customer.statement.filter(
        (statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString()
    )     

    return response.json(statement)
})

app.post("/withdraw/:cpf", verifyIfExistsAccountCPF, (request, response) => {
    const {amount} = request.body
    const {customer} = request

    if(getBalance(customer.statement) < amount)
        return response.status(400).json({error: "Insufficient funds!"})

    const statementOperation = {
        description: "Operacao de Debito",
        amount,
        created_at: new Date(),
        type: "debit",
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

app.get("/balance/:cpf", verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request

    const balance = getBalance(customer.statement)

    return response.status(200).json({balance: balance})   
})

app.listen(3333)