--1.	Selecione todos os nomes e salários dos funcionários da tabela “employees”.
SELECT e.name, e.salary 
FROM employees e

--2.	Liste os nomes dos funcionários e seus departamentos correspondentes da tabela “employees” e “departments”.
SELECT e.name as employee, d.name as department
FROM employees e
INNER JOIN departments d ON d.id = e.departments_id

--3.	Calcule a média salarial de todos os funcionários na tabela “employees”.
SELECT avg(e.salary) as average_salary
FROM employees e