Dictionary: [
    'FE' => 'Front End',
    'Admin' => 'Admin Page for Customer Service',
    'CS' => 'Customer Service',
    'Active Basket' => 'Most recently created basket that is not yet assigned to any order',
    'Current Customer' => Registered  customer who in current period of time performs any kind of actions on the website Front End',
    'Give Away' => 'Free product related to some marketing campaign'
]

Order is more described in Order 'Readme.md' file.
Marketing is more described in Marketing 'Readme.md' file.
Product is more described in Product 'Readme.md' file.
Variants is more described in Product -> Variants -> 'Readme.md' file.
Personalization is more described in Personalization 'Readme.md' file.

Customer
#CustomerType = {
    0 => 'Guest',
    1 => 'Active',
    2 => 'Registered',
    3 => 'Inactive',
    4 => 'Blocked',
    5 => 'Disabled',
    6 => 'Removed',
}

#CustomerType
Customer supposed to have different types for easier management for CS and Order Entity.

If customer type === 0 then means it's guest customer

#Active Customer Feature + Include them in MULTI-STORE
Should have Enable/Disable Mode.
Should have option to set time limits
Let's find customers that haven't purchased things for a while and notify them about our selfs.
Let's find customers that haven't finished purchase and still have product in their basket and notify them about our selfs. 
