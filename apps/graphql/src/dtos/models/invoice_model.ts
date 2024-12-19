import { Field, Float, GraphQLISODateTime, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Info {
  @Field(() => String)
  key: string

  @Field(() => Int)
  number: number

  @Field(() => GraphQLISODateTime)
  competence: Date

  @Field(() => GraphQLISODateTime)
  dateIssue: Date

  @Field(() => Int)
  series: number
}

@ObjectType()
export class Address {
  @Field(() => String)
  street: string

  @Field(() => String)
  number: string

  @Field(() => String)
  neighborhood: string

  @Field(() => String, { nullable: true })
  complement: string
}

@ObjectType()
export class Person {
  @Field(() => String)
  name: string

  @Field(() => String)
  identity: string

  @Field(() => Address)
  address: Address

  @Field(() => String)
  city: string
}

@ObjectType()
export class Service {
  @Field(() => String)
  code: string

  @Field(() => String)
  codeDescription: string

  @Field(() => String)
  serviceDescription: string

  @Field(() => String)
  locationProvision: string
}

@ObjectType()
export class Invoice {
  @Field(() => String)
  id: string

  @Field(() => Info)
  info: Info

  @Field(() => Person)
  issuer: Person

  @Field(() => Person)
  recipient: Person

  @Field(() => Service)
  service: Service

  @Field(() => Float)
  total: number
}
