Dictionary: [
    'FE' => 'Front End',
    'Admin' => 'Admin Page for Customer Service',
    'CS' => 'Customer Service',
    'Active Basket' => 'Most recently created basket that is not yet assigned to any order',
    'Current Customer' => Registered  customer who in current period of time performs any kind of actions on the website Front End',
    'Give Away' => 'Free product related to some marketing campaign'
]

Marketing is more described in .project-plan -> Marketing -> 'Readme.md' file.
Customer is more described in Customer 'Readme.md' file.
Product is more described in Product 'Readme.md' file.
Variants is more described in Product -> Variants -> 'Readme.md' file.
Personalization is more described in Personalization 'Readme.md' file.

About Order
Basic order is order that contains:
1. registered customer
1-1. Customer Address Details
2. active basket (1 or many)
2-1. conditions (with or without) 
2-2. products variants OR
2-2. product personalization 

#Partial Reorder

Goal of this feature is to take any basket ->
*basket template from promo rule(feature #Order-1)
*any promo rule(Marketing)
*previous order(feature #Order-2)
*external api(feature #Order-3)
...can be added fulfilled in the future :)

So I assume to see specific basket conditions from Marketing, External Clients and basic Reorder. Based on this conditions I can manipulate basket data and what's inside. 

Basket functionality more is described in Basket 'Readme.md' file.

#Guest Order

When we are reaching final checkout step or reaching moment when we ready to place manually order in admin* Order entity will validate if this customer is assigned to this basket or not. If basket won't provide customer address entity, means we will have to create new record in Customer entity with guest type customer. 
Customer functionality more is described in Customer 'Readme.md' file.
