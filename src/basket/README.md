Dictionary: [
    'FE' => 'Front End',
    'Admin' => 'Admin Page for Customer Service',
    'CS' => 'Customer Service',
    'Active Basket' => 'Most recently created basket that is not yet assigned to any order',
    'Current Customer' => Registered  customer who in current period of time performs any kind of actions on the website Front End',
    'Give Away' => 'Free product related to some marketing campaign'
]

Marketing is more described in .project-plan -> Marketing -> 'Readme.md' file.
Order is more described in Order 'Readme.md' file.
Customer is more described in Customer 'Readme.md' file.
Product is more described in Product 'Readme.md' file.
Variants is more described in Product -> Variants -> 'Readme.md' file.
Personalization is more described in Personalization 'Readme.md' file.

Basket -> 
It's an entity that contains main basket data to maintain customer activity with products and personalizations, marketing promo conditions, 

#Assign to customer
Goal of this feature is to when user will register, we could check at least by email
if this customer did place order before so in this case this basket can appear for customer
#Merge multiple baskets into 1

The goal of this feature is to make future life easier
to achieve partial reorder. 

#Partial reorder is designed for customers (FE*) and customer service (Admin*).
Goal of partial reorder is more described in Order 'Readme.md' file.

For Customer will require option to compare active basket* with one previous orders of current customer*. Then fully or partially merge from existing to currently active basket.

!!!INCLUDES TESTING!!! entityManager has function .merge(), looks interesting...