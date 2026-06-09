# DEBUG AUDIT REPORT

Generated from `tmp/CoinPoker_sample_full.txt`.

## Parser Audit Report

- Total hand blocks: 194
- NLH-like hand blocks: 193
- Exact standard NLH hand blocks: 192
- PLO hand blocks: 1
- Parsed hands: 192

| Hand ID    | Parsed | Header                                                                               | Reason                                                                                                           |
| ---------- | ------ | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| 6345250344 | false  | CoinPoker Hand #6345250344: PLO 4 (₮0.01/₮0.02) 2026/06/07 19:56:35 CEST             | Unsupported V1 game type: PLO hand is intentionally ignored.                                                     |
| 6359930078 | false  | CoinPoker Hand #6359930078: NLH BombPot (₮0.01/₮0.02/₮0.08) 2026/06/07 20:14:02 CEST | Unsupported V1 NLH variant: BombPot header does not match exact NLH cash header and has three blind/ante values. |

### Parser Finding

The current parser does not miss any exact standard `NLH (smallBlind/bigBlind)` hand. The apparent one-hand gap is `NLH BombPot`, which is NLH-like but not a standard V1 cash hand header.

## Current Statistics Snapshot

| Metric                       | Current value | Numerator | Denominator | Recomputed from hand audit |
| ---------------------------- | ------------: | --------: | ----------: | -------------------------: |
| Hands played                 |           192 |       192 |           - |                        192 |
| Total profit                 |         -0.36 |         - |           - |                      -0.36 |
| BB/100                       |         -7.36 |         - |   192 hands |                      -7.36 |
| VPIP                         |        38.02% |        73 |         192 |                     38.02% |
| PFR                          |        22.92% |        44 |         192 |                     22.92% |
| 3Bet                         |         2.78% |         2 |          72 |                      2.78% |
| Fold to 3Bet                 |        28.57% |         2 |           7 |                     28.57% |
| Limp                         |         3.13% |         6 |         192 |                      3.13% |
| CBet Flop                    |        63.33% |        19 |          30 |                     63.33% |
| Fold to CBet Flop            |        30.00% |         3 |          10 |                     30.00% |
| WTSD current                 |        57.35% |        39 |          68 |                     57.35% |
| W$SD current                 |        74.36% |        29 |          39 |                     74.36% |
| WTSD raw-showdown validation |             - |        39 |          68 |                     57.35% |
| W$SD raw-showdown validation |             - |        29 |          39 |                     74.36% |

## Per-Hand Statistics Audit

| Hand ID     | Cards | Pos | VPIP  | VPIP reason                                                        | PFR   | PFR reason                                                                    | 3Bet  | 3Bet reason                                                                     | Fold to 3Bet | Fold to 3Bet reason                                                             | Limp  | Limp reason                                                                                        | CBet Flop | CBet Flop reason                                                                      | Fold to CBet Flop | Fold to CBet Flop reason                                                                       | WTSD current | WTSD raw | W$SD current | W$SD raw | HeroNet |
| ----------- | ----- | --- | ----- | ------------------------------------------------------------------ | ----- | ----------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------- | ------------ | -------- | ------------ | -------- | ------: |
| 6347530307  | Jh 5h | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=fe3e2d66.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.05 |
| 6347530308  | 9c 6d | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=82055252.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6347530309  | Ah 8c | BTN | true  | First voluntary Hero action: preflop: Hero: calls ₮0.12.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.12. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.12.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=313b608e.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.12 |
| 6347530310  | 7c 4h | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=4cbadf23.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6347530311  | 8c 2s | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=0aca143f.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122096  | 4h 3c | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=e075f02b.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6299122097  | Ah 7s | SB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | true         | Hero folded after opening and facing a re-raise: preflop: Hero: folds.          | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=2939c4eb.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.05 |
| 6299122098  | Jh 8s | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=cb38460e.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122099  | 5d 3h | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=7a29bc76.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122100  | Jh Ts | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.01 |
| 6299122101  | 8s 6h | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.01.           | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | true  | First voluntary Hero action was an unopened call: preflop: Hero: calls ₮0.01.                      | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.04 |
| 6299122102  | Th Tc | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.15. | false        | Hero continued after opening and facing a re-raise: preflop: Hero: calls ₮0.15. | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=5182e599.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.19 |
| 6299122103  | Qd Tc | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122104  | Kc 7s | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=14bce396.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122105  | 7d 6s | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=34c5bd07.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6299122106  | 9h 2s | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6299122107  | Kd Jd | BTN | true  | First voluntary Hero action: preflop: Hero: calls ₮0.06.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.06. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.06.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=3b52385b.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.08 |
| 6299122108  | 8c 6c | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122109  | Qc 5d | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122110  | Jd 7c | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=ecf9fa30.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6359930071  | Th 9c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=dba3e9e1.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6299122111  | 6c 6d | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.04.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.04. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.04.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=270b4b88.       | false             | Hero continued versus flop c-bet: flop: Hero: calls ₮0.09.                                     | true         | true     | true         | true     |    0.42 |
| 6359930072  | 4c 2c | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=6e27c622.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6359930073  | Kc Td | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.05.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.05. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.05.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=0ca9dced.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.22 |
| 6299122112  | Jc 8s | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=6ef58227.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122113  | As 9c | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=cf413cbc.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6359930074  | Kd 3c | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=7faf94e3.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122114  | 4h 2c | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.01 |
| 6359930075  | As 4d | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122115  | 8h 5d | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=b1203ebd.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6359930076  | As 6c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=b643aa8b.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6359930077  | Ks 3c | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=38fba636.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6299122116  | Ks 9d | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.06.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | false        | false    |   -0.65 |
| 6299122117  | Ah 5h | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.04.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.05 |
| 6359930079  | Ac 3c | BTN | true  | First voluntary Hero action: preflop: Hero: calls ₮0.05.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.05. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.05.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=9c752e5a.       | false             | Hero continued versus flop c-bet: flop: Hero: calls ₮0.05.                                     | true         | true     | true         | true     |    0.15 |
| 6299122118  | 8h 3h | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122119  | Ad Qh | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.08.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.08. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.08.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=92240ebd.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.34 |
| 6359930080  | Th 6h | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=d9d5e075.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122120  | 4c 3h | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6299122121  | Qh 8s | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=b833839e.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6359930081  | Qd Jh | HJ  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.06.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.45 |
| 6299122122  | 6c 2c | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=dc9e96e7.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6299122123  | Ah 8c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6359930082  | 6d 5d | UTG | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | false     | First flop aggressive action was not a Hero bet/all-in: flop: e63f16ec: bets ₮0.08.   | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.05 |
| 6299122124  | Ks Qs | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.16.           | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.16.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=4623e1e4.       | false             | Hero continued versus flop c-bet: flop: Hero: calls ₮0.36.                                     | true         | true     | true         | true     |    2.46 |
| 6359930083  | 9d 7c | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6359930084  | Kd 7s | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=978108bc.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6299122125  | Qs 7h | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=01466912.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6375710043  | Th Tc | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.01 |
| 6375710044  | 6h 2c | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=dae17012.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6375710045  | Kc Td | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.03. | false        | Hero continued after opening and facing a re-raise: preflop: Hero: calls ₮0.03. | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=fc95470f.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.17 |
| 6375710046  | Kd Qd | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.05.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.14 |
| 6375710047  | 9s 8h | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=f3fb26b8.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6375710048  | Jd 4s | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=07746d47.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6375710049  | 5d 3h | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=24b0aad3.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710050  | 8s 6s | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=776e45b1.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710051  | 2s 2c | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.07.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.07. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.07.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=4af92ecb.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.25 |
| 6375710052  | As Jc | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.04.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.04. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.04.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=69cfb375.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.05 |
| 6375710053  | 8h 7d | BTN | true  | First voluntary Hero action: preflop: Hero: calls ₮0.05.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.05. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.05.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=1b57a5f4.       | false             | Hero continued versus flop c-bet: flop: Hero: raises ₮0.14 to ₮0.20.                           | false        | false    | n/a          | n/a      |   -0.25 |
| 6375710054  | 9d 4d | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710055  | Qh 4d | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=5fdaa7ce.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6375710056  | Ad 4h | SB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | false     | Hero was preflop aggressor and saw flop, but no Hero first flop bet/all-in was found. | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.07 |
| 6375710057  | Ts 9s | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.06 to ₮0.08. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.06 to ₮0.08. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.06 to ₮0.08. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.08.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.49 |
| 6375710058  | As 7s | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | false     | First flop aggressive action was not a Hero bet/all-in: flop: c45d63dd: bets ₮0.15.   | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | false        | false    |   -0.74 |
| 6375710059  | 8c 6c | HJ  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.02.           | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | true  | First voluntary Hero action was an unopened call: preflop: Hero: calls ₮0.02.                      | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6375710060  | Ac 3c | UTG | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.15. | false        | Hero continued after opening and facing a re-raise: preflop: Hero: calls ₮0.15. | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=861badd7.       | n/a               | Opponent c-bet was found, but Hero had no subsequent response; likely all-in/no-decision spot. | false        | false    | n/a          | n/a      |   -0.20 |
| 6375710061  | Kc 8d | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=61cd3b5e.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6375710062  | 6h 3d | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=28aaa286.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710063  | 6s 5s | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.04 to ₮0.06. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.04 to ₮0.06. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.04 to ₮0.06. | false     | Hero was preflop aggressor and saw flop, but no Hero first flop bet/all-in was found. | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.06 |
| 6375710064  | 9c 3h | HJ  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710065  | 6h 2h | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=27130ea9.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710066  | Ac 2s | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.05.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.05. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.05.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=07b31d50.       | true              | Hero folded to flop c-bet: flop: Hero: folds.                                                  | false        | false    | n/a          | n/a      |   -0.07 |
| 6375710067  | Qh 8d | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=0f3812f9.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6375710068  | Qd 5c | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=97cc8d26.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370691  | Ah 5s | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.02.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.02. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.02.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=40353184.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.07 |
| 6375710069  | Qh Jh | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | false     | First flop aggressive action was not a Hero bet/all-in: flop: 0674321f: bets ₮0.08.   | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    1.76 |
| 6353370692  | Kc Qd | SB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=Hero.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.02 |
| 6353370693  | 6s 3s | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=a5ac8219.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710070  | Jc 9s | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.04 |
| 6375710071  | Jc 5h | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=b4acef01.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6353370694  | Js 5c | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370695  | As Tc | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710072  | 5s 3s | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.06.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.11 |
| 6353370696  | Qh 7s | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=523ca7b1.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6343041011  | 4h 3h | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.08.           | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.08.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=c653584a.       | true              | Hero folded to flop c-bet: flop: Hero: folds.                                                  | false        | false    | n/a          | n/a      |   -0.10 |
| 6353370697  | 7h 2h | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.01.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | true  | First voluntary Hero action was an unopened call: preflop: Hero: calls ₮0.01.                      | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=e32ff986.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6375710073  | Kd Td | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.14.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.73 |
| 6353370698  | 8c 4c | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=6cddf1b7.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370699  | 7c 2h | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041012  | 7s 3s | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6353370700  | Jc Tc | HJ  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.04.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.09 |
| 6375710074  | 8h 3h | HJ  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=a7dfff6b.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041013  | Kh 3s | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=e0d4fe18.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710075  | Js 2c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370701  | 8s 8h | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.02.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.02. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.02.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=787af928.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.12 |
| 6343041014  | 6c 5c | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.06.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.09 |
| 6375710076  | 5d 4s | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6353370702  | Jh 6h | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6343041015  | 9h 3c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=3e35b0c6.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6375710077  | Th 5h | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.01.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.04. | n/a          | Hero did not open-raise and then face a re-raise.                               | true  | First voluntary Hero action was an unopened call: preflop: Hero: calls ₮0.01.                      | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=72ca1a26.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.05 |
| 6353370703  | 8s 4c | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370704  | 9d 5s | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370705  | 7h 3d | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=35b5384c.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041016  | Td 3d | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6375710078  | As Ah | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.06.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.09 |
| 6343041017  | 3s 3c | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.03.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.03. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.03.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=12ccd7d3.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.16 |
| 6353370706  | 7d 6d | BB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.04 to ₮0.06. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.04 to ₮0.06. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.04 to ₮0.06. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=Hero.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.03 |
| 6353370707  | 7c 5d | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=2c5ab55e.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6343041018  | As Kh | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.06.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | false        | false    |   -0.66 |
| 6353370708  | Jd 4c | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=02374887.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370709  | 4c 3h | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=49e702b4.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370710  | Kc 8c | HJ  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.10. | false        | Hero continued after opening and facing a re-raise: preflop: Hero: calls ₮0.10. | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=ec4f9039.       | false             | Hero continued versus flop c-bet: flop: Hero: calls ₮0.11.                                     | true         | true     | true         | true     |    0.26 |
| 6343041019  | As 6c | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.08.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.15 |
| 6353370711  | 7c 2c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=0ab61a45.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041020  | Ks Qh | UTG | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | false     | First flop aggressive action was not a Hero bet/all-in: flop: 96fa2649: bets ₮0.02.   | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.28 |
| 6353370712  | Ad 4s | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.03.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.03. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.03.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=682659b7.       | false             | Hero continued versus flop c-bet: flop: Hero: calls ₮0.04.                                     | true         | true     | false        | false    |   -0.25 |
| 6343041021  | 8c 4s | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370713  | Jh Jd | SB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=Hero.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.02 |
| 6343041022  | Td 2s | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=c26f171f.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6353370714  | Kh Qc | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=Hero.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.03 |
| 6353370715  | 9h 2d | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=71119f65.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370716  | Kd 4c | HJ  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=e6862969.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041023  | Ah 3h | SB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.04 to ₮0.06. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.04 to ₮0.06. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.04 to ₮0.06. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.07.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.14 |
| 6353370717  | 7h 3c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041024  | Ks 3h | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370718  | 5h 4d | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.02.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.02. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.02.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=3f48a0eb.       | false             | Hero continued versus flop c-bet: flop: Hero: calls ₮0.30.                                     | true         | true     | false        | false    |   -1.95 |
| 6343041025  | Tc 7d | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=586be3db.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041026  | Jh 6c | HJ  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=4a282786.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041027  | Kc 5c | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.03.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.03. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.03.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=e0cd9d1f.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.16 |
| 6343041028  | Kh Kd | SB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.09 to ₮0.14. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.09 to ₮0.14. | true  | Hero re-raised after one opponent raise: preflop: Hero: raises ₮0.09 to ₮0.14.  | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.09 to ₮0.14. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.12.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.19 |
| 6343041029  | 7h 6c | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.04 to ₮0.06. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.04 to ₮0.06. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.04 to ₮0.06. | false     | First flop aggressive action was not a Hero bet/all-in: flop: f68a9f8c: bets ₮0.10.   | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.06 |
| 6353370723  | Ks 4h | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.01 |
| 6353370724  | 8s 2d | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=4f89500a.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6343041030  | Tc 3s | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=19e2b704.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370725  | Ac 2s | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | false     | Hero was preflop aggressor and saw flop, but no Hero first flop bet/all-in was found. | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.35 |
| 6343041031  | Td 5c | HJ  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=c93dd4cc.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041032  | Td 6h | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=3c80909f.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370726  | 9d 2d | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=f26f7108.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041033  | 9s 4c | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=c6b92fd7.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6353370727  | Qs 9d | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=f4ce4883.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370728  | Kd Jc | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.03.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.03. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.03.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=89d8639f.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.14 |
| 6343041034  | 4s 3s | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.04.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.04. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.04.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=91967dc8.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.05 |
| 6353370729  | Js 8s | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.01.           | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | true  | First voluntary Hero action was an unopened call: preflop: Hero: calls ₮0.01.                      | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6343041035  | 8s 6d | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=d37e822f.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041036  | 8h 2h | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=62071763.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041037  | Kh Td | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=35d55303.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370730  | Qh 7h | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=Hero.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.03 |
| 6353370731  | Kd 4c | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6343041038  | Ts 2h | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 6353370732  | 5h 4d | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=080f7489.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 6353370733  | As 5s | BB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.06.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.06. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.06.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=d28c50bb.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.15 |
| 6353370734  | Qs 6h | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.01.           | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | true  | First voluntary Hero action was an unopened call: preflop: Hero: calls ₮0.01.                      | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 6353370735  | 5c 4c | BTN | true  | First voluntary Hero action: preflop: Hero: calls ₮0.05.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.05. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.05.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=42baeecf.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.11 |
| 6353370736  | Kc 7c | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.10.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.50 |
| 6353370737  | Ad 2c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=c5dd1bbe.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 804490002   | Qc 2d | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.04 |
| 64312100122 | Kd 3s | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=none.           | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | false        | false    |   -0.16 |
| 64114500383 | 4d 2s | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=6cc4d058.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 64312100123 | As 9d | SB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=Hero.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.02 |
| 64114500384 | Kc Th | SB  | true  | First voluntary Hero action: preflop: Hero: calls ₮0.05.           | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.05. | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was call, not an unopened call: preflop: Hero: calls ₮0.05.            | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=56264cd7.       | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.06 |
| 64312100124 | Js 7h | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64312100125 | As 2s | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | true         | Hero folded after opening and facing a re-raise: preflop: Hero: folds.          | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=05e87137.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.07 |
| 64312100126 | 6d 4h | HJ  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=a13616f9.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64114500385 | 7s 5s | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.04.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | false        | false    |   -0.23 |
| 64312100127 | 9s 8c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=aa7b8779.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64114500386 | Kc Qc | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | false     | Hero was preflop aggressor and saw flop, but no Hero first flop bet/all-in was found. | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | false        | false    |   -0.47 |
| 64312100128 | 7s 7h | BB  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.05.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.10 |
| 64312100129 | 9c 7s | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=bd5e2e7c.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 64114500387 | Jc 3s | HJ  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=53bd8ff8.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64312100130 | 7c 7d | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.05 to ₮0.07. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.05 to ₮0.07. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.05 to ₮0.07. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.06.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.27 |
| 64114500388 | Th 5s | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=96abfb06.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64114500389 | Ac 6d | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=0e93cac7.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 64312100131 | Ad 8d | CO  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=Hero.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.03 |
| 64114500390 | Jd 8s | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=7be56e6d.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 64312100132 | Jc 3c | HJ  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=e7462de4.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64114500391 | Qh 9s | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=dd4c2f8e.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64312100133 | Kc Qc | UTG | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: calls ₮0.10. | false        | Hero continued after opening and facing a re-raise: preflop: Hero: calls ₮0.10. | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a       | No CBet opportunity by current engine: sawFlop=true, preflopAggressor=1c0fc08e.       | true              | Hero folded to flop c-bet: flop: Hero: folds.                                                  | false        | false    | n/a          | n/a      |   -0.15 |
| 64114500392 | 5s 2d | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=c437d679.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64114500393 | As Qs | HJ  | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | true      | Hero made first flop bet/all-in as preflop aggressor: flop: Hero: bets ₮0.04.         | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | false        | false    |   -0.51 |
| 64312100134 | 6c 5h | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=f571dd81.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 64312100135 | 7h 5d | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=a0b930bf.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 64114500394 | Jc 6h | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=8f4de89c.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64312100136 | 4s 3c | BTN | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=87ed496b.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64114500395 | 7c 3d | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.01 |
| 64114500396 | Qh 4s | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=d5920930.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |
| 64312100137 | As 3c | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=d1f1104f.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64312100138 | Js Jh | HJ  | true  | First voluntary Hero action: preflop: Hero: ALLIN ₮1.94.           | true  | Hero made a preflop raise/all-in raise: preflop: Hero: ALLIN ₮1.94.           | true  | Hero re-raised after one opponent raise: preflop: Hero: ALLIN ₮1.94.            | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was all_in, not an unopened call: preflop: Hero: ALLIN ₮1.94.          | false     | Hero was preflop aggressor and saw flop, but no Hero first flop bet/all-in was found. | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | false        | false    |   -0.74 |
| 64114500397 | As 5c | BTN | true  | First voluntary Hero action: preflop: Hero: raises ₮0.03 to ₮0.05. | true  | Hero made a preflop raise/all-in raise: preflop: Hero: raises ₮0.03 to ₮0.05. | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | First voluntary Hero action was raise, not an unopened call: preflop: Hero: raises ₮0.03 to ₮0.05. | false     | Hero was preflop aggressor and saw flop, but no Hero first flop bet/all-in was found. | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | true         | true     | true         | true     |    0.25 |
| 64312100139 | Qd 5c | UTG | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64312100140 | Jc 8s | BB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=b1afcc0f.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.02 |
| 64114500398 | 6d 2s | CO  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | n/a   | No Hero decision after exactly one prior opponent raise.                        | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=none.          | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |    0.00 |
| 64312100141 | Kc 5h | SB  | false | No Hero voluntary preflop call/raise/bet/all-in.                   | false | No Hero preflop raise or all-in raise action.                                 | false | Hero faced one opponent raise and did not re-raise: preflop: Hero: folds.       | n/a          | Hero did not open-raise and then face a re-raise.                               | false | Hero's first voluntary action was not an unopened preflop call.                                    | n/a       | No CBet opportunity by current engine: sawFlop=false, preflopAggressor=89df4054.      | n/a               | No opponent flop c-bet opportunity found by current engine.                                    | false        | false    | n/a          | n/a      |   -0.01 |

## Opportunity Lists

### WTSD Opportunity Count

- Saw flop count: 68
- Current reached showdown count: 39
- Raw-showdown reached showdown count: 39
- Current formula: 39 / 68 = 57.35%
- Raw-showdown validation formula: 39 / 68 = 57.35%

Saw flop hand IDs: 6347530309, 6299122101, 6299122102, 6299122107, 6299122111, 6359930073, 6299122116, 6299122117, 6359930079, 6299122119, 6359930081, 6359930082, 6299122124, 6359930083, 6375710045, 6375710046, 6375710051, 6375710052, 6375710053, 6375710056, 6375710057, 6375710058, 6375710059, 6375710060, 6375710063, 6375710066, 6353370691, 6375710069, 6375710070, 6375710072, 6343041011, 6375710073, 6353370700, 6353370701, 6343041014, 6375710076, 6375710077, 6343041016, 6375710078, 6343041017, 6343041018, 6353370710, 6343041019, 6343041020, 6353370712, 6343041023, 6353370718, 6343041027, 6343041028, 6343041029, 6353370725, 6353370728, 6343041034, 6353370729, 6353370733, 6353370734, 6353370735, 6353370736, 64312100122, 64114500384, 64114500385, 64114500386, 64312100128, 64312100130, 64312100133, 64114500393, 64312100138, 64114500397

Current reached showdown hand IDs: 6299122102, 6299122107, 6299122111, 6359930073, 6299122116, 6299122117, 6359930079, 6299122119, 6359930081, 6299122124, 6375710046, 6375710051, 6375710056, 6375710057, 6375710058, 6375710069, 6353370700, 6343041014, 6375710077, 6375710078, 6343041018, 6353370710, 6343041019, 6343041020, 6353370712, 6343041023, 6353370718, 6343041028, 6353370728, 6353370733, 6353370735, 6353370736, 64312100122, 64114500385, 64114500386, 64312100130, 64114500393, 64312100138, 64114500397

Raw-showdown reached showdown hand IDs: 6299122102, 6299122107, 6299122111, 6359930073, 6299122116, 6299122117, 6359930079, 6299122119, 6359930081, 6299122124, 6375710046, 6375710051, 6375710056, 6375710057, 6375710058, 6375710069, 6353370700, 6343041014, 6375710077, 6375710078, 6343041018, 6353370710, 6343041019, 6343041020, 6353370712, 6343041023, 6353370718, 6343041028, 6353370728, 6353370733, 6353370735, 6353370736, 64312100122, 64114500385, 64114500386, 64312100130, 64114500393, 64312100138, 64114500397

### W$SD Validation

- Current showdown hands: 39
- Current showdown wins: 29
- Current showdown losses: 10
- Current formula: 29 / 39 = 74.36%
- Raw-showdown hands: 39
- Raw-showdown wins: 29
- Raw-showdown losses: 10
- Raw-showdown formula: 29 / 39 = 74.36%

| Hand ID     | Current WTSD | Current W$SD | Raw WTSD | Raw W$SD | Current reason                                                        | Raw reason                                                        |
| ----------- | ------------ | ------------ | -------- | -------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 6299122102  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6299122107  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6299122111  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6359930073  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6299122116  | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6299122117  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6359930079  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6299122119  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6359930081  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6299122124  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6375710046  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6375710051  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6375710056  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6375710057  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6375710058  | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6375710069  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6353370700  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6343041014  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6375710077  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6375710078  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6343041018  | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6353370710  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6343041019  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6343041020  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6353370712  | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6343041023  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6353370718  | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6343041028  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6353370728  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6353370733  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6353370735  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 6353370736  | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 64312100122 | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 64114500385 | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 64114500386 | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 64312100130 | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 64114500393 | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 64312100138 | true         | false        | true     | false    | Parser showdown object includes Hero entry=true or Hero winner=false. | Raw hand has showdown marker and Hero-specific showdown evidence. |
| 64114500397 | true         | true         | true     | true     | Parser showdown object includes Hero entry=true or Hero winner=true.  | Raw hand has showdown marker and Hero-specific showdown evidence. |

## Discrepancies and Suspect Spots

- WTSD current overcounts versus raw showdown marker: 0
  - Hand IDs: none
- WTSD current undercounts versus raw showdown marker: 0
  - Hand IDs: none
- W$SD current overcounts versus raw showdown marker: 0
  - Hand IDs: none
- W$SD current undercounts versus raw showdown marker: 0
  - Hand IDs: none
- CBet opportunities with zero flop actions: 1
  - Hand IDs: 64312100138
  - Adjusted CBet if excluded: 19 / 29 = 65.52%
- Hero net discrepancies between independent action audit and parser: 0
  - Hand IDs: none

## Hero Profit Validation For Special Hands

| Hand ID     | Parsed | Flags                         | Expected Hero result | Current parser result | Discrepancy |
| ----------- | ------ | ----------------------------- | -------------------: | --------------------: | ----------: |
| 6347530307  | true   | RETURN                        |                -0.05 |                 -0.05 |        0.00 |
| 6347530308  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6347530310  | true   | RETURN, auto big blind        |                 0.00 |                  0.00 |        0.00 |
| 6345250344  | false  | RETURN, auto big blind        |                  n/a |                   n/a |         n/a |
| 6299122096  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6299122097  | true   | RETURN                        |                -0.05 |                 -0.05 |        0.00 |
| 6299122098  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122099  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122100  | true   | RETURN                        |                 0.01 |                  0.01 |        0.00 |
| 6299122101  | true   | RETURN                        |                -0.04 |                 -0.04 |        0.00 |
| 6299122102  | true   | RETURN                        |                 0.19 |                  0.19 |        0.00 |
| 6299122103  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122104  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122106  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6299122107  | true   | RETURN                        |                 0.08 |                  0.08 |        0.00 |
| 6299122109  | true   | ALLIN                         |                 0.00 |                  0.00 |        0.00 |
| 6299122110  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6359930071  | true   | RETURN, auto big blind        |                -0.02 |                 -0.02 |        0.00 |
| 6299122111  | true   | RETURN, ALLIN, SPLASH dropped |                 0.42 |                  0.42 |        0.00 |
| 6359930072  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6299122112  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122113  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122114  | true   | RETURN                        |                 0.01 |                  0.01 |        0.00 |
| 6359930075  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122115  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6359930076  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6359930077  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6299122116  | true   | RETURN, ALLIN                 |                -0.65 |                 -0.65 |        0.00 |
| 6359930078  | false  | RETURN                        |                  n/a |                   n/a |         n/a |
| 6299122117  | true   | RETURN                        |                 0.05 |                  0.05 |        0.00 |
| 6359930079  | true   | RETURN                        |                 0.15 |                  0.15 |        0.00 |
| 6299122118  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122119  | true   | RETURN, ALLIN                 |                 0.34 |                  0.34 |        0.00 |
| 6359930080  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122120  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6299122121  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6359930081  | true   | RETURN, ALLIN                 |                 0.45 |                  0.45 |        0.00 |
| 6299122122  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6299122123  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6359930082  | true   | RETURN                        |                -0.05 |                 -0.05 |        0.00 |
| 6299122124  | true   | RETURN, ALLIN                 |                 2.46 |                  2.46 |        0.00 |
| 6359930083  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6359930084  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6299122125  | true   | ALLIN                         |                -0.01 |                 -0.01 |        0.00 |
| 6375710043  | true   | RETURN                        |                 0.01 |                  0.01 |        0.00 |
| 6375710044  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6375710045  | true   | RETURN                        |                -0.17 |                 -0.17 |        0.00 |
| 6375710046  | true   | RETURN                        |                 0.14 |                  0.14 |        0.00 |
| 6375710049  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6375710050  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6375710051  | true   | RETURN                        |                 0.25 |                  0.25 |        0.00 |
| 6375710053  | true   | RETURN                        |                -0.25 |                 -0.25 |        0.00 |
| 6375710054  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6375710055  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6375710056  | true   | RETURN                        |                 0.07 |                  0.07 |        0.00 |
| 6375710057  | true   | RETURN, auto big blind        |                 0.49 |                  0.49 |        0.00 |
| 6375710059  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6375710060  | true   | ALLIN                         |                -0.20 |                 -0.20 |        0.00 |
| 6375710062  | true   | RETURN, auto big blind        |                 0.00 |                  0.00 |        0.00 |
| 6375710063  | true   | RETURN                        |                -0.06 |                 -0.06 |        0.00 |
| 6375710065  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6375710066  | true   | RETURN                        |                -0.07 |                 -0.07 |        0.00 |
| 6375710067  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6353370691  | true   | RETURN                        |                -0.07 |                 -0.07 |        0.00 |
| 6375710069  | true   | RETURN, ALLIN                 |                 1.76 |                  1.76 |        0.00 |
| 6353370692  | true   | RETURN                        |                 0.02 |                  0.02 |        0.00 |
| 6353370693  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6375710070  | true   | RETURN                        |                -0.04 |                 -0.04 |        0.00 |
| 6375710071  | true   | RETURN, auto big blind        |                -0.01 |                 -0.01 |        0.00 |
| 6353370694  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370695  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6375710072  | true   | RETURN                        |                -0.11 |                 -0.11 |        0.00 |
| 6353370696  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6343041011  | true   | ALLIN                         |                -0.10 |                 -0.10 |        0.00 |
| 6353370697  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6375710073  | true   | RETURN, ALLIN                 |                -0.73 |                 -0.73 |        0.00 |
| 6353370698  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370699  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370700  | true   | RETURN                        |                 0.09 |                  0.09 |        0.00 |
| 6343041013  | true   | RETURN, ALLIN                 |                 0.00 |                  0.00 |        0.00 |
| 6375710075  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370701  | true   | RETURN                        |                -0.12 |                 -0.12 |        0.00 |
| 6343041014  | true   | RETURN                        |                 0.09 |                  0.09 |        0.00 |
| 6375710076  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6353370702  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6343041015  | true   | RETURN, ALLIN                 |                 0.00 |                  0.00 |        0.00 |
| 6375710077  | true   | RETURN                        |                 0.05 |                  0.05 |        0.00 |
| 6353370703  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370704  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041016  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6375710078  | true   | RETURN                        |                 0.09 |                  0.09 |        0.00 |
| 6343041017  | true   | RETURN, auto big blind        |                -0.16 |                 -0.16 |        0.00 |
| 6353370706  | true   | RETURN, auto big blind        |                 0.03 |                  0.03 |        0.00 |
| 6353370707  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6353370708  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370709  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370710  | true   | RETURN                        |                 0.26 |                  0.26 |        0.00 |
| 6343041019  | true   | RETURN                        |                 0.15 |                  0.15 |        0.00 |
| 6343041021  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370713  | true   | RETURN                        |                 0.02 |                  0.02 |        0.00 |
| 6343041022  | true   | ALLIN                         |                -0.02 |                 -0.02 |        0.00 |
| 6353370714  | true   | RETURN                        |                 0.03 |                  0.03 |        0.00 |
| 6353370715  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041023  | true   | RETURN                        |                 0.14 |                  0.14 |        0.00 |
| 6353370717  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041024  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370718  | true   | RETURN, ALLIN                 |                -1.95 |                 -1.95 |        0.00 |
| 6343041025  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041026  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041027  | true   | RETURN                        |                -0.16 |                 -0.16 |        0.00 |
| 6343041028  | true   | RETURN                        |                 0.19 |                  0.19 |        0.00 |
| 6343041029  | true   | RETURN, ALLIN, auto big blind |                -0.06 |                 -0.06 |        0.00 |
| 6353370723  | true   | RETURN                        |                 0.01 |                  0.01 |        0.00 |
| 6353370724  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6343041030  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370725  | true   | RETURN, ALLIN                 |                -0.35 |                 -0.35 |        0.00 |
| 6343041031  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041032  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370726  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370727  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370728  | true   | RETURN                        |                 0.14 |                  0.14 |        0.00 |
| 6343041034  | true   | RETURN                        |                -0.05 |                 -0.05 |        0.00 |
| 6353370729  | true   | RETURN, auto big blind        |                -0.02 |                 -0.02 |        0.00 |
| 6343041035  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041036  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041037  | true   | ALLIN                         |                 0.00 |                  0.00 |        0.00 |
| 6353370730  | true   | RETURN                        |                 0.03 |                  0.03 |        0.00 |
| 6353370731  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6343041038  | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 6353370732  | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 6353370733  | true   | RETURN                        |                 0.15 |                  0.15 |        0.00 |
| 6353370734  | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 6353370735  | true   | RETURN                        |                 0.11 |                  0.11 |        0.00 |
| 6353370737  | true   | auto big blind                |                 0.00 |                  0.00 |        0.00 |
| 804490002   | true   | RETURN                        |                 0.04 |                  0.04 |        0.00 |
| 64114500383 | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 64312100123 | true   | RETURN                        |                 0.02 |                  0.02 |        0.00 |
| 64114500384 | true   | RETURN                        |                -0.06 |                 -0.06 |        0.00 |
| 64312100124 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64312100125 | true   | RETURN                        |                -0.07 |                 -0.07 |        0.00 |
| 64312100126 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64312100127 | true   | RETURN, SPLASH dropped        |                 0.00 |                  0.00 |        0.00 |
| 64312100128 | true   | RETURN                        |                -0.10 |                 -0.10 |        0.00 |
| 64312100129 | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 64114500387 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64114500388 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64114500389 | true   | RETURN                        |                -0.02 |                 -0.02 |        0.00 |
| 64312100131 | true   | RETURN                        |                 0.03 |                  0.03 |        0.00 |
| 64312100132 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64114500391 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64312100133 | true   | RETURN                        |                -0.15 |                 -0.15 |        0.00 |
| 64114500392 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64312100134 | true   | RETURN, ALLIN                 |                -0.02 |                 -0.02 |        0.00 |
| 64312100135 | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |
| 64312100136 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64114500395 | true   | RETURN                        |                 0.01 |                  0.01 |        0.00 |
| 64312100137 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64312100138 | true   | RETURN, ALLIN                 |                -0.74 |                 -0.74 |        0.00 |
| 64114500397 | true   | RETURN                        |                 0.25 |                  0.25 |        0.00 |
| 64312100139 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64312100140 | true   | RETURN, ALLIN                 |                -0.02 |                 -0.02 |        0.00 |
| 64114500398 | true   | RETURN                        |                 0.00 |                  0.00 |        0.00 |
| 64312100141 | true   | RETURN                        |                -0.01 |                 -0.01 |        0.00 |

### Raw Special Hands

#### Hand 6347530307 (RETURN)

Expected Hero result: -0.05; Current parser result: -0.05; Discrepancy: 0.00.

```text
CoinPoker Hand #6347530307: NLH (₮0.02/₮0.05) 2026/06/07 19:20:28 CEST
Table '200600' 6-max Seat #4 is the button
Seat 1: 0dbbd985 (₮7.50 in chips)
Seat 2: 3c9a3cef (₮5 in chips)
Seat 3: e0c4ea9f (₮5.41 in chips)
Seat 4: 5d71f1a1 (₮5.84 in chips)
Seat 5: fe3e2d66 (₮6.96 in chips)
Seat 6: Hero (₮5 in chips)
fe3e2d66: posts small blind ₮0.02
Hero: posts big blind ₮0.05
*** HOLE CARDS ***
Dealt to 0dbbd985
Dealt to 3c9a3cef
Dealt to e0c4ea9f
Dealt to 5d71f1a1
Dealt to fe3e2d66
Dealt to Hero [Jh 5h]
0dbbd985: folds
3c9a3cef: raises ₮0.07 to ₮0.12
e0c4ea9f: folds
5d71f1a1: folds
fe3e2d66: raises ₮0.07 to ₮0.19
Hero: folds
3c9a3cef: calls ₮0.07
*** FLOP *** [7c 3h Jc]
fe3e2d66: bets ₮0.32
3c9a3cef: calls ₮0.32
*** TURN *** [7c 3h Jc] [6h]
fe3e2d66: checks
3c9a3cef: checks
*** RIVER *** [7c 3h Jc 6h] [Ad]
fe3e2d66: checks
3c9a3cef: bets ₮1.35
fe3e2d66: folds
3c9a3cef: RETURN ₮1.35
*** SHOWDOWN ***
3c9a3cef collected ₮1.02 from pot
*** SUMMARY ***
Total pot ₮1.07 | Rake ₮0.05
Hand was run once
Board [ 7c 3h Jc 6h Ad ]
Game ended: 2026/06/07 19:21:48 CEST
Seat 1: 0dbbd985 folded before Flop (didn't bet)
Seat 2: 3c9a3cef won (₮1.02)
Seat 3: e0c4ea9f folded before Flop (didn't bet)
Seat 4: 5d71f1a1 folded before Flop (didn't bet)
Seat 5: fe3e2d66 folded on the River
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6347530308 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6347530308: NLH (₮0.02/₮0.05) 2026/06/07 19:21:52 CEST
Table '200600' 6-max Seat #5 is the button
Seat 2: 4ed9a5a2 (₮5.51 in chips)
Seat 3: 82055252 (₮5.41 in chips)
Seat 4: 51dbb860 (₮5.84 in chips)
Seat 5: 7a19b993 (₮6.45 in chips)
Seat 6: Hero (₮4.95 in chips)
Hero: posts small blind ₮0.02
4ed9a5a2: posts big blind ₮0.05
*** HOLE CARDS ***
Dealt to 4ed9a5a2
Dealt to 82055252
Dealt to 51dbb860
Dealt to 7a19b993
Dealt to Hero [9c 6d]
82055252: raises ₮0.10 to ₮0.15
51dbb860: folds
7a19b993: folds
Hero: folds
4ed9a5a2: folds
82055252: RETURN ₮0.10
*** SHOWDOWN ***
82055252 collected ₮0.12 from pot
*** SUMMARY ***
Total pot ₮0.12 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 19:22:06 CEST
Seat 2: 4ed9a5a2 folded before Flop (didn't bet)
Seat 3: 82055252 won (₮0.12)
Seat 4: 51dbb860 folded before Flop (didn't bet)
Seat 5: 7a19b993 folded before Flop (didn't bet)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6347530310 (RETURN, auto big blind)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6347530310: NLH (₮0.02/₮0.05) 2026/06/07 19:23:46 CEST
Table '200600' 6-max Seat #2 is the button
Seat 2: 9633b1c3 (₮5 in chips)
Seat 3: 4cbadf23 (₮6.20 in chips)
Seat 4: 18bbb63a (₮5.72 in chips)
Seat 5: 3bf9cd60 (₮2 in chips)
Seat 6: Hero (₮4.81 in chips)
4cbadf23: posts small blind ₮0.02
18bbb63a: posts big blind ₮0.05
3bf9cd60: posts auto big blind ₮0.05
*** HOLE CARDS ***
Dealt to 9633b1c3
Dealt to 4cbadf23
Dealt to 18bbb63a
Dealt to 3bf9cd60
Dealt to Hero [7c 4h]
3bf9cd60: checks
Hero: folds
9633b1c3: folds
4cbadf23: raises ₮0.10 to ₮0.15
18bbb63a: folds
3bf9cd60: folds
4cbadf23: RETURN ₮0.10
*** SHOWDOWN ***
4cbadf23 collected ₮0.15 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 19:24:36 CEST
Seat 2: 9633b1c3 folded before Flop (didn't bet)
Seat 3: 4cbadf23 won (₮0.15)
Seat 4: 18bbb63a folded before Flop (didn't bet)
Seat 5: 3bf9cd60 folded before Flop (didn't bet)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6345250344 (RETURN, auto big blind)

Expected Hero result: n/a unsupported/skipped; Current parser result: n/a unsupported/skipped; Discrepancy: n/a.

```text
CoinPoker Hand #6345250344: PLO 4 (₮0.01/₮0.02) 2026/06/07 19:56:35 CEST
Table '200591' 6-max Seat #5 is the button
Seat 4: Hero (₮2 in chips)
Seat 1: 3ecfbefb (₮1.68 in chips)
Seat 2: eb8d62d5 (₮1.29 in chips)
Seat 3: d849f593 (₮0.67 in chips)
Seat 5: 3b94aec9 (₮2 in chips)
Seat 6: ee159fb2 (₮2.72 in chips)
ee159fb2: posts small blind ₮0.01
3ecfbefb: posts big blind ₮0.02
Hero: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Qc 9c Qd 6h]
Dealt to 3ecfbefb
Dealt to eb8d62d5
Dealt to d849f593
Dealt to 3b94aec9
Dealt to ee159fb2
eb8d62d5: folds
d849f593: folds
Hero: checks
3b94aec9: folds
ee159fb2: folds
3ecfbefb: raises ₮0.05 to ₮0.07
Hero: folds
3ecfbefb: RETURN ₮0.05
*** SHOWDOWN ***
3ecfbefb collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 19:57:23 CEST
Seat 4: Hero folded before Flop (didn't bet)
Seat 1: 3ecfbefb won (₮0.05)
Seat 2: eb8d62d5 folded before Flop (didn't bet)
Seat 3: d849f593 folded before Flop (didn't bet)
Seat 5: 3b94aec9 folded before Flop (didn't bet)
Seat 6: ee159fb2 folded before Flop (didn't bet)
```

#### Hand 6299122096 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122096: NLH (₮0.01/₮0.02) 2026/06/07 19:59:05 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: Hero (₮2 in chips)
Seat 4: 96b79f89 (₮3.66 in chips)
Seat 5: e075f02b (₮2.42 in chips)
Seat 6: 71340207 (₮2.78 in chips)
71340207: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [4h 3c]
Dealt to 96b79f89
Dealt to e075f02b
Dealt to 71340207
96b79f89: raises ₮0.04 to ₮0.06
e075f02b: raises ₮0.12 to ₮0.18
71340207: folds
Hero: folds
96b79f89: folds
e075f02b: RETURN ₮0.12
*** SHOWDOWN ***
e075f02b collected ₮0.15 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 19:59:28 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 4: 96b79f89 folded before Flop (didn't bet)
Seat 5: e075f02b won (₮0.15)
Seat 6: 71340207 folded before Flop (didn't bet)
```

#### Hand 6299122097 (RETURN)

Expected Hero result: -0.05; Current parser result: -0.05; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122097: NLH (₮0.01/₮0.02) 2026/06/07 19:59:32 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: Hero (₮1.98 in chips)
Seat 4: 2939c4eb (₮3.60 in chips)
Seat 5: a62debb9 (₮2.51 in chips)
Seat 6: a5bd9905 (₮2.77 in chips)
Hero: posts small blind ₮0.01
2939c4eb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ah 7s]
Dealt to 2939c4eb
Dealt to a62debb9
Dealt to a5bd9905
a62debb9: folds
a5bd9905: folds
Hero: raises ₮0.03 to ₮0.05
2939c4eb: raises ₮0.15 to ₮0.20
Hero: folds
2939c4eb: RETURN ₮0.15
*** SHOWDOWN ***
2939c4eb collected ₮0.10 from pot
*** SUMMARY ***
Total pot ₮0.10 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 19:59:56 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 4: 2939c4eb won (₮0.10)
Seat 5: a62debb9 folded before Flop (didn't bet)
Seat 6: a5bd9905 folded before Flop (didn't bet)
```

#### Hand 6299122098 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122098: NLH (₮0.01/₮0.02) 2026/06/07 20:00:00 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: Hero (₮1.93 in chips)
Seat 4: 3b48ae7f (₮3.65 in chips)
Seat 5: 9fbc8ee1 (₮2.51 in chips)
Seat 6: cb38460e (₮2.77 in chips)
3b48ae7f: posts small blind ₮0.01
9fbc8ee1: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Jh 8s]
Dealt to 3b48ae7f
Dealt to 9fbc8ee1
Dealt to cb38460e
cb38460e: raises ₮0.04 to ₮0.06
Hero: folds
3b48ae7f: folds
9fbc8ee1: folds
cb38460e: RETURN ₮0.04
*** SHOWDOWN ***
cb38460e collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:00:40 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 4: 3b48ae7f folded before Flop (didn't bet)
Seat 5: 9fbc8ee1 folded before Flop (didn't bet)
Seat 6: cb38460e won (₮0.05)
```

#### Hand 6299122099 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122099: NLH (₮0.01/₮0.02) 2026/06/07 20:00:45 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: Hero (₮1.93 in chips)
Seat 4: 7a29bc76 (₮3.64 in chips)
Seat 5: 8b72f501 (₮2.49 in chips)
Seat 6: 75a6459d (₮2.80 in chips)
8b72f501: posts small blind ₮0.01
75a6459d: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [5d 3h]
Dealt to 7a29bc76
Dealt to 8b72f501
Dealt to 75a6459d
Hero: folds
7a29bc76: raises ₮0.04 to ₮0.06
8b72f501: folds
75a6459d: folds
7a29bc76: RETURN ₮0.04
*** SHOWDOWN ***
7a29bc76 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:01:15 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 4: 7a29bc76 won (₮0.05)
Seat 5: 8b72f501 folded before Flop (didn't bet)
Seat 6: 75a6459d folded before Flop (didn't bet)
```

#### Hand 6299122100 (RETURN)

Expected Hero result: 0.01; Current parser result: 0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122100: NLH (₮0.01/₮0.02) 2026/06/07 20:01:20 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: Hero (₮1.93 in chips)
Seat 4: 19f379a9 (₮3.67 in chips)
Seat 5: 232d7c4d (₮2.48 in chips)
Seat 6: e7fede26 (₮2.78 in chips)
e7fede26: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Jh Ts]
Dealt to 19f379a9
Dealt to 232d7c4d
Dealt to e7fede26
19f379a9: folds
232d7c4d: folds
e7fede26: folds
Hero: RETURN ₮0.01
*** SHOWDOWN ***
Hero collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:01:35 CEST
Seat 1: Hero showed [Jh Ts] and won (₮0.02)
Seat 4: 19f379a9 folded before Flop (didn't bet)
Seat 5: 232d7c4d folded before Flop (didn't bet)
Seat 6: e7fede26 folded before Flop (didn't bet)
```

#### Hand 6299122101 (RETURN)

Expected Hero result: -0.04; Current parser result: -0.04; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122101: NLH (₮0.01/₮0.02) 2026/06/07 20:01:40 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: Hero (₮1.94 in chips)
Seat 3: f055a211 (₮0.80 in chips)
Seat 4: 41fe4809 (₮3.67 in chips)
Seat 5: e5f8426d (₮2.48 in chips)
Seat 6: c305dae2 (₮2.77 in chips)
Hero: posts small blind ₮0.01
f055a211: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [8s 6h]
Dealt to f055a211
Dealt to 41fe4809
Dealt to e5f8426d
Dealt to c305dae2
41fe4809: folds
e5f8426d: folds
c305dae2: folds
Hero: calls ₮0.01
f055a211: checks
*** FLOP *** [2d 4d 5d]
Hero: bets ₮0.02
f055a211: raises ₮0.08 to ₮0.10
Hero: folds
f055a211: RETURN ₮0.08
*** SHOWDOWN ***
f055a211 collected ₮0.08 from pot
*** SUMMARY ***
Total pot ₮0.08 | Rake ₮0
Hand was run once
Board [ 2d 4d 5d ]
Game ended: 2026/06/07 20:02:31 CEST
Seat 1: Hero folded on the Flop
Seat 3: f055a211 won (₮0.08)
Seat 4: 41fe4809 folded before Flop (didn't bet)
Seat 5: e5f8426d folded before Flop (didn't bet)
Seat 6: c305dae2 folded before Flop (didn't bet)
```

#### Hand 6299122102 (RETURN)

Expected Hero result: 0.19; Current parser result: 0.19; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122102: NLH (₮0.01/₮0.02) 2026/06/07 20:02:36 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: Hero (₮2 in chips)
Seat 3: 34806c0e (₮0.84 in chips)
Seat 4: 5182e599 (₮3.67 in chips)
Seat 5: fbd6fa91 (₮2.48 in chips)
Seat 6: f7de913f (₮2.77 in chips)
34806c0e: posts small blind ₮0.01
5182e599: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Th Tc]
Dealt to 34806c0e
Dealt to 5182e599
Dealt to fbd6fa91
Dealt to f7de913f
fbd6fa91: folds
f7de913f: folds
Hero: raises ₮0.03 to ₮0.05
34806c0e: folds
5182e599: raises ₮0.15 to ₮0.20
Hero: calls ₮0.15
*** FLOP *** [2s 9h Ah]
5182e599: checks
Hero: bets ₮0.20
5182e599: folds
Hero: RETURN ₮0.20
*** SHOWDOWN ***
Hero collected ₮0.39 from pot
*** SUMMARY ***
Total pot ₮0.41 | Rake ₮0.02
Hand was run once
Board [ 2s 9h Ah ]
Game ended: 2026/06/07 20:03:17 CEST
Seat 1: Hero showed [Th Tc] and won (₮0.39)
Seat 3: 34806c0e folded before Flop (didn't bet)
Seat 4: 5182e599 folded on the Flop
Seat 5: fbd6fa91 folded before Flop (didn't bet)
Seat 6: f7de913f folded before Flop (didn't bet)
```

#### Hand 6299122103 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122103: NLH (₮0.01/₮0.02) 2026/06/07 20:03:22 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: Hero (₮2.19 in chips)
Seat 3: 631c41e1 (₮0.83 in chips)
Seat 4: e39d4487 (₮3.47 in chips)
Seat 5: 4b20865a (₮2.48 in chips)
Seat 6: 5575a7d9 (₮2.77 in chips)
e39d4487: posts small blind ₮0.01
4b20865a: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Qd Tc]
Dealt to 631c41e1
Dealt to e39d4487
Dealt to 4b20865a
Dealt to 5575a7d9
5575a7d9: folds
Hero: folds
631c41e1: calls ₮0.02
e39d4487: folds
4b20865a: checks
*** FLOP *** [Qs 3c 6c]
4b20865a: checks
631c41e1: checks
*** TURN *** [Qs 3c 6c] [Qh]
4b20865a: checks
631c41e1: bets ₮0.05
4b20865a: folds
631c41e1: RETURN ₮0.05
*** SHOWDOWN ***
631c41e1 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [ Qs 3c 6c Qh ]
Game ended: 2026/06/07 20:04:14 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: 631c41e1 won (₮0.05)
Seat 4: e39d4487 folded before Flop (didn't bet)
Seat 5: 4b20865a folded on the Turn
Seat 6: 5575a7d9 folded before Flop (didn't bet)
```

#### Hand 6299122104 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122104: NLH (₮0.01/₮0.02) 2026/06/07 20:04:19 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: Hero (₮2.19 in chips)
Seat 3: a9fa8dbe (₮0.86 in chips)
Seat 4: 14faf3a6 (₮3.46 in chips)
Seat 5: 14bce396 (₮2.46 in chips)
Seat 6: 0d39ed04 (₮2.77 in chips)
14bce396: posts small blind ₮0.01
0d39ed04: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Kc 7s]
Dealt to a9fa8dbe
Dealt to 14faf3a6
Dealt to 14bce396
Dealt to 0d39ed04
Hero: folds
a9fa8dbe: calls ₮0.02
14faf3a6: folds
14bce396: raises ₮0.10 to ₮0.12
0d39ed04: folds
a9fa8dbe: calls ₮0.10
*** FLOP *** [2s 5s Ks]
14bce396: checks
a9fa8dbe: checks
*** TURN *** [2s 5s Ks] [3s]
14bce396: bets ₮0.09
a9fa8dbe: folds
14bce396: RETURN ₮0.09
*** SHOWDOWN ***
14bce396 collected ₮0.25 from pot
*** SUMMARY ***
Total pot ₮0.26 | Rake ₮0.01
Hand was run once
Board [ 2s 5s Ks 3s ]
Game ended: 2026/06/07 20:05:02 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: a9fa8dbe folded on the Turn
Seat 4: 14faf3a6 folded before Flop (didn't bet)
Seat 5: 14bce396 won (₮0.25)
Seat 6: 0d39ed04 folded before Flop (didn't bet)
```

#### Hand 6299122106 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122106: NLH (₮0.01/₮0.02) 2026/06/07 20:06:01 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: Hero (₮2.17 in chips)
Seat 3: 9beee97d (₮0.74 in chips)
Seat 4: b73295bd (₮3.46 in chips)
Seat 5: 7f7778df (₮2.50 in chips)
Seat 6: 63df0496 (₮2.85 in chips)
Hero: posts small blind ₮0.01
9beee97d: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [9h 2s]
Dealt to 9beee97d
Dealt to b73295bd
Dealt to 7f7778df
Dealt to 63df0496
b73295bd: folds
7f7778df: folds
63df0496: folds
Hero: folds
9beee97d: RETURN ₮0.01
*** SHOWDOWN ***
9beee97d collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:06:17 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: 9beee97d won (₮0.02)
Seat 4: b73295bd folded before Flop (didn't bet)
Seat 5: 7f7778df folded before Flop (didn't bet)
Seat 6: 63df0496 folded before Flop (didn't bet)
```

#### Hand 6299122107 (RETURN)

Expected Hero result: 0.08; Current parser result: 0.08; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122107: NLH (₮0.01/₮0.02) 2026/06/07 20:06:22 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: Hero (₮2.16 in chips)
Seat 3: 938e1ff3 (₮0.75 in chips)
Seat 4: 2f5276c3 (₮3.46 in chips)
Seat 5: 7e980882 (₮2.50 in chips)
Seat 6: 3b52385b (₮2.85 in chips)
938e1ff3: posts small blind ₮0.01
2f5276c3: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Kd Jd]
Dealt to 938e1ff3
Dealt to 2f5276c3
Dealt to 7e980882
Dealt to 3b52385b
7e980882: folds
3b52385b: raises ₮0.04 to ₮0.06
Hero: calls ₮0.06
938e1ff3: folds
2f5276c3: folds
*** FLOP *** [9s 8c Jh]
3b52385b: checks
Hero: bets ₮0.05
3b52385b: folds
Hero: RETURN ₮0.05
*** SHOWDOWN ***
Hero collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0.01
Hand was run once
Board [ 9s 8c Jh ]
Game ended: 2026/06/07 20:06:57 CEST
Seat 1: Hero showed [Kd Jd] and won (₮0.14)
Seat 3: 938e1ff3 folded before Flop (didn't bet)
Seat 4: 2f5276c3 folded before Flop (didn't bet)
Seat 5: 7e980882 folded before Flop (didn't bet)
Seat 6: 3b52385b folded on the Flop
```

#### Hand 6299122109 (ALLIN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122109: NLH (₮0.01/₮0.02) 2026/06/07 20:07:26 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: Hero (₮2.24 in chips)
Seat 3: a24711d4 (₮0.77 in chips)
Seat 4: 68d2c76d (₮3.43 in chips)
Seat 5: eba067b4 (₮2.48 in chips)
Seat 6: 916a0b20 (₮2.79 in chips)
eba067b4: posts small blind ₮0.01
916a0b20: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Qc 5d]
Dealt to a24711d4
Dealt to 68d2c76d
Dealt to eba067b4
Dealt to 916a0b20
Hero: folds
a24711d4: calls ₮0.02
68d2c76d: folds
eba067b4: folds
916a0b20: checks
*** FLOP *** [2h 3c Tc]
916a0b20: checks
a24711d4: bets ₮0.05
916a0b20: calls ₮0.05
*** TURN *** [2h 3c Tc] [2d]
916a0b20: checks
a24711d4: bets ₮0.15
916a0b20: calls ₮0.15
*** RIVER *** [2h 3c Tc 2d] [9h]
916a0b20: checks
a24711d4: ALLIN ₮0.55
916a0b20: calls ₮0.55
*** SHOWDOWN ***
a24711d4: shows [Jc Jd] (Two Pair)
a24711d4 collected ₮1.47 from pot
916a0b20: shows [5c Td] (Two Pair)
*** SUMMARY ***
Total pot ₮1.55 | Rake ₮0.08
Hand was run once
Board [ 2h 3c Tc 2d 9h ]
Game ended: 2026/06/07 20:08:38 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: a24711d4 showed [Jc Jd] and won (₮1.47) with Two Pair
Seat 4: 68d2c76d folded before Flop (didn't bet)
Seat 5: eba067b4 folded before Flop (didn't bet)
Seat 6: 916a0b20 showed [5c Td] and lost with Two Pair
```

#### Hand 6299122110 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122110: NLH (₮0.01/₮0.02) 2026/06/07 20:08:44 CEST
Table '200588' 6-max Seat #5 is the button
Seat 3: abf52e57 (₮1.47 in chips)
Seat 1: Hero (₮2.24 in chips)
Seat 4: ecd95506 (₮3.43 in chips)
Seat 5: ecf9fa30 (₮2.47 in chips)
Seat 6: 06365115 (₮2.02 in chips)
06365115: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to abf52e57
Dealt to Hero [Jd 7c]
Dealt to ecd95506
Dealt to ecf9fa30
Dealt to 06365115
abf52e57: folds
ecd95506: folds
ecf9fa30: raises ₮0.03 to ₮0.05
06365115: folds
Hero: folds
ecf9fa30: RETURN ₮0.03
*** SHOWDOWN ***
ecf9fa30 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:09:00 CEST
Seat 3: abf52e57 folded before Flop (didn't bet)
Seat 1: Hero folded before Flop (didn't bet)
Seat 4: ecd95506 folded before Flop (didn't bet)
Seat 5: ecf9fa30 won (₮0.05)
Seat 6: 06365115 folded before Flop (didn't bet)
```

#### Hand 6359930071 (RETURN, auto big blind)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930071: NLH (₮0.01/₮0.02) 2026/06/07 20:08:53 CEST
Table '201367' 6-max Seat #5 is the button
Seat 1: 05a05d75 (₮4.78 in chips)
Seat 2: dba3e9e1 (₮2.59 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: 533d579b (₮1.98 in chips)
Seat 5: 158771ce (₮2.99 in chips)
05a05d75: posts small blind ₮0.01
dba3e9e1: posts big blind ₮0.02
Hero: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to 05a05d75
Dealt to dba3e9e1
Dealt to Hero [Th 9c]
Dealt to 533d579b
Dealt to 158771ce
Hero: checks
533d579b: folds
158771ce: folds
05a05d75: calls ₮0.01
dba3e9e1: raises ₮0.03 to ₮0.05
Hero: folds
05a05d75: calls ₮0.03
*** FLOP *** [5d Qc 7s]
05a05d75: checks
dba3e9e1: bets ₮0.06
05a05d75: folds
dba3e9e1: RETURN ₮0.06
*** SHOWDOWN ***
dba3e9e1 collected ₮0.11 from pot
*** SUMMARY ***
Total pot ₮0.12 | Rake ₮0.01
Hand was run once
Board [ 5d Qc 7s ]
Game ended: 2026/06/07 20:09:43 CEST
Seat 1: 05a05d75 folded on the Flop
Seat 2: dba3e9e1 won (₮0.11)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 533d579b folded before Flop (didn't bet)
Seat 5: 158771ce folded before Flop (didn't bet)
```

#### Hand 6299122111 (RETURN, ALLIN, SPLASH dropped)

Expected Hero result: 0.42; Current parser result: 0.42; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122111: NLH (₮0.01/₮0.02) 2026/06/07 20:09:05 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: Hero (₮2.22 in chips)
Seat 4: 6d57df32 (₮3.43 in chips)
Seat 5: 270b4b88 (₮2.50 in chips)
Seat 6: bd0b2a72 (₮2.01 in chips)
SPLASH dropped ₮0.40
Hero: posts small blind ₮0.01
6d57df32: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [6c 6d]
Dealt to 6d57df32
Dealt to 270b4b88
Dealt to bd0b2a72
270b4b88: raises ₮0.03 to ₮0.05
bd0b2a72: calls ₮0.05
Hero: calls ₮0.04
6d57df32: folds
*** FLOP *** [2d 2c Ts]
Hero: checks
270b4b88: bets ₮0.09
bd0b2a72: folds
Hero: calls ₮0.09
*** TURN *** [2d 2c Ts] [5d]
Hero: checks
270b4b88: bets ₮0.25
Hero: calls ₮0.25
*** RIVER *** [2d 2c Ts 5d] [Qh]
Hero: ALLIN ₮1.83
270b4b88: folds
Hero: RETURN ₮1.83
*** SHOWDOWN ***
Hero collected ₮0.81 from pot
*** SUMMARY ***
Total pot ₮1.25 | Rake ₮0.04
Hand was run once
Board [ 2d 2c Ts 5d Qh ]
Game ended: 2026/06/07 20:10:29 CEST
Seat 1: Hero showed [6c 6d] and won (₮0.81)
Seat 4: 6d57df32 folded before Flop (didn't bet)
Seat 5: 270b4b88 folded on the River
Seat 6: bd0b2a72 folded on the Flop
```

#### Hand 6359930072 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930072: NLH (₮0.01/₮0.02) 2026/06/07 20:09:48 CEST
Table '201367' 6-max Seat #1 is the button
Seat 1: 50a5fbe1 (₮4.73 in chips)
Seat 2: 3a1b7213 (₮2.65 in chips)
Seat 3: Hero (₮1.98 in chips)
Seat 4: 993f9a92 (₮1.98 in chips)
Seat 5: 6e27c622 (₮2.99 in chips)
3a1b7213: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 50a5fbe1
Dealt to 3a1b7213
Dealt to Hero [4c 2c]
Dealt to 993f9a92
Dealt to 6e27c622
993f9a92: folds
6e27c622: raises ₮0.03 to ₮0.05
50a5fbe1: folds
3a1b7213: folds
Hero: folds
6e27c622: RETURN ₮0.03
*** SHOWDOWN ***
6e27c622 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:10:05 CEST
Seat 1: 50a5fbe1 folded before Flop (didn't bet)
Seat 2: 3a1b7213 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 993f9a92 folded before Flop (didn't bet)
Seat 5: 6e27c622 won (₮0.05)
```

#### Hand 6299122112 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122112: NLH (₮0.01/₮0.02) 2026/06/07 20:10:34 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: Hero (₮3.04 in chips)
Seat 4: 6ef58227 (₮3.41 in chips)
Seat 5: 1741ae6d (₮2.11 in chips)
Seat 6: d85b3b58 (₮2 in chips)
6ef58227: posts small blind ₮0.01
1741ae6d: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Jc 8s]
Dealt to 6ef58227
Dealt to 1741ae6d
Dealt to d85b3b58
d85b3b58: folds
Hero: folds
6ef58227: raises ₮0.07 to ₮0.09
1741ae6d: calls ₮0.07
*** FLOP *** [Th Kh 7d]
6ef58227: checks
1741ae6d: bets ₮0.06
6ef58227: folds
1741ae6d: RETURN ₮0.06
*** SHOWDOWN ***
1741ae6d collected ₮0.17 from pot
*** SUMMARY ***
Total pot ₮0.18 | Rake ₮0.01
Hand was run once
Board [ Th Kh 7d ]
Game ended: 2026/06/07 20:11:10 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 4: 6ef58227 folded on the Flop
Seat 5: 1741ae6d won (₮0.17)
Seat 6: d85b3b58 folded before Flop (didn't bet)
```

#### Hand 6299122113 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122113: NLH (₮0.01/₮0.02) 2026/06/07 20:11:15 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: Hero (₮3.04 in chips)
Seat 4: cf413cbc (₮3.32 in chips)
Seat 5: cbf76031 (₮2.19 in chips)
Seat 6: 5170a8d7 (₮2 in chips)
cbf76031: posts small blind ₮0.01
5170a8d7: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [As 9c]
Dealt to cf413cbc
Dealt to cbf76031
Dealt to 5170a8d7
Hero: folds
cf413cbc: raises ₮0.03 to ₮0.05
cbf76031: folds
5170a8d7: folds
cf413cbc: RETURN ₮0.03
*** SHOWDOWN ***
cf413cbc collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:11:42 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 4: cf413cbc won (₮0.05)
Seat 5: cbf76031 folded before Flop (didn't bet)
Seat 6: 5170a8d7 folded before Flop (didn't bet)
```

#### Hand 6299122114 (RETURN)

Expected Hero result: 0.01; Current parser result: 0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122114: NLH (₮0.01/₮0.02) 2026/06/07 20:11:47 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: Hero (₮3.04 in chips)
Seat 4: aacadb12 (₮3.35 in chips)
Seat 5: 46718b7b (₮2.18 in chips)
Seat 6: 5aaf26a6 (₮2 in chips)
5aaf26a6: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [4h 2c]
Dealt to aacadb12
Dealt to 46718b7b
Dealt to 5aaf26a6
aacadb12: folds
46718b7b: folds
5aaf26a6: folds
Hero: RETURN ₮0.01
*** SHOWDOWN ***
Hero collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:12:25 CEST
Seat 1: Hero showed [4h 2c] and won (₮0.02)
Seat 4: aacadb12 folded before Flop (didn't bet)
Seat 5: 46718b7b folded before Flop (didn't bet)
Seat 6: 5aaf26a6 folded before Flop (didn't bet)
```

#### Hand 6359930075 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930075: NLH (₮0.01/₮0.02) 2026/06/07 20:12:29 CEST
Table '201367' 6-max Seat #4 is the button
Seat 1: a19f30dc (₮4.89 in chips)
Seat 2: bb63f57d (₮2.64 in chips)
Seat 3: Hero (₮2.18 in chips)
Seat 4: 075cc141 (₮1.74 in chips)
Seat 5: 6ab30ea4 (₮2.84 in chips)
Seat 6: d173802f (₮2 in chips)
6ab30ea4: posts small blind ₮0.01
d173802f: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to a19f30dc
Dealt to bb63f57d
Dealt to Hero [As 4d]
Dealt to 075cc141
Dealt to 6ab30ea4
Dealt to d173802f
a19f30dc: folds
bb63f57d: folds
Hero: folds
075cc141: folds
6ab30ea4: folds
d173802f: RETURN ₮0.01
*** SHOWDOWN ***
d173802f collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:12:52 CEST
Seat 1: a19f30dc folded before Flop (didn't bet)
Seat 2: bb63f57d folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 075cc141 folded before Flop (didn't bet)
Seat 5: 6ab30ea4 folded before Flop (didn't bet)
Seat 6: d173802f won (₮0.02)
```

#### Hand 6299122115 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122115: NLH (₮0.01/₮0.02) 2026/06/07 20:12:30 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: Hero (₮3.05 in chips)
Seat 3: 3e8a6716 (₮0.80 in chips)
Seat 4: 888b9cb9 (₮3.35 in chips)
Seat 5: 6ac0ae98 (₮2.18 in chips)
Seat 6: b1203ebd (₮2 in chips)
Hero: posts small blind ₮0.01
3e8a6716: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [8h 5d]
Dealt to 3e8a6716
Dealt to 888b9cb9
Dealt to 6ac0ae98
Dealt to b1203ebd
888b9cb9: folds
6ac0ae98: raises ₮0.03 to ₮0.05
b1203ebd: raises ₮0.10 to ₮0.15
Hero: folds
3e8a6716: calls ₮0.13
6ac0ae98: calls ₮0.10
*** FLOP *** [Jd 3s 4d]
3e8a6716: checks
6ac0ae98: checks
b1203ebd: bets ₮0.28
3e8a6716: folds
6ac0ae98: folds
b1203ebd: RETURN ₮0.28
*** SHOWDOWN ***
b1203ebd collected ₮0.44 from pot
*** SUMMARY ***
Total pot ₮0.46 | Rake ₮0.02
Hand was run once
Board [ Jd 3s 4d ]
Game ended: 2026/06/07 20:13:36 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: 3e8a6716 folded on the Flop
Seat 4: 888b9cb9 folded before Flop (didn't bet)
Seat 5: 6ac0ae98 folded on the Flop
Seat 6: b1203ebd won (₮0.44)
```

#### Hand 6359930076 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930076: NLH (₮0.01/₮0.02) 2026/06/07 20:12:57 CEST
Table '201367' 6-max Seat #5 is the button
Seat 2: 7667de86 (₮2.64 in chips)
Seat 3: Hero (₮2.18 in chips)
Seat 4: 42b1ba31 (₮1.74 in chips)
Seat 5: 3d87d609 (₮2.83 in chips)
Seat 6: b643aa8b (₮2.01 in chips)
b643aa8b: posts small blind ₮0.01
7667de86: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 7667de86
Dealt to Hero [As 6c]
Dealt to 42b1ba31
Dealt to 3d87d609
Dealt to b643aa8b
Hero: folds
42b1ba31: folds
3d87d609: raises ₮0.03 to ₮0.05
b643aa8b: raises ₮0.18 to ₮0.23
7667de86: folds
3d87d609: folds
b643aa8b: RETURN ₮0.18
*** SHOWDOWN ***
b643aa8b collected ₮0.12 from pot
*** SUMMARY ***
Total pot ₮0.12 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:13:26 CEST
Seat 2: 7667de86 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 42b1ba31 folded before Flop (didn't bet)
Seat 5: 3d87d609 folded before Flop (didn't bet)
Seat 6: b643aa8b won (₮0.12)
```

#### Hand 6359930077 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930077: NLH (₮0.01/₮0.02) 2026/06/07 20:13:31 CEST
Table '201367' 6-max Seat #6 is the button
Seat 2: 6d928c60 (₮2.62 in chips)
Seat 3: Hero (₮2.18 in chips)
Seat 4: 950f9b41 (₮1.74 in chips)
Seat 5: 38fba636 (₮2.78 in chips)
Seat 6: 8626ea78 (₮2.08 in chips)
6d928c60: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 6d928c60
Dealt to Hero [Ks 3c]
Dealt to 950f9b41
Dealt to 38fba636
Dealt to 8626ea78
950f9b41: folds
38fba636: raises ₮0.03 to ₮0.05
8626ea78: folds
6d928c60: folds
Hero: folds
38fba636: RETURN ₮0.03
*** SHOWDOWN ***
38fba636 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:13:57 CEST
Seat 2: 6d928c60 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 950f9b41 folded before Flop (didn't bet)
Seat 5: 38fba636 won (₮0.05)
Seat 6: 8626ea78 folded before Flop (didn't bet)
```

#### Hand 6299122116 (RETURN, ALLIN)

Expected Hero result: -0.65; Current parser result: -0.65; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122116: NLH (₮0.01/₮0.02) 2026/06/07 20:13:41 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: Hero (₮3.04 in chips)
Seat 3: 97a8e3a4 (₮0.65 in chips)
Seat 4: 1636d8da (₮3.35 in chips)
Seat 5: 210220b6 (₮2.03 in chips)
Seat 6: 02b58bc5 (₮2.29 in chips)
97a8e3a4: posts small blind ₮0.01
1636d8da: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ks 9d]
Dealt to 97a8e3a4
Dealt to 1636d8da
Dealt to 210220b6
Dealt to 02b58bc5
210220b6: folds
02b58bc5: folds
Hero: raises ₮0.03 to ₮0.05
97a8e3a4: calls ₮0.04
1636d8da: folds
*** FLOP *** [4h 2h 6h]
97a8e3a4: checks
Hero: bets ₮0.06
97a8e3a4: calls ₮0.06
*** TURN *** [4h 2h 6h] [2c]
97a8e3a4: checks
Hero: bets ₮0.18
97a8e3a4: calls ₮0.18
*** RIVER *** [4h 2h 6h 2c] [Tc]
97a8e3a4: checks
Hero: ALLIN ₮2.75
97a8e3a4: ALLIN ₮0.36
Hero: RETURN ₮2.39
*** SHOWDOWN ***
97a8e3a4: shows [3h 3d] (Two Pair)
97a8e3a4 collected ₮1.25 from pot
Hero: shows [Ks 9d] (One Pair)
*** SUMMARY ***
Total pot ₮1.32 | Rake ₮0.07
Hand was run once
Board [ 4h 2h 6h 2c Tc ]
Game ended: 2026/06/07 20:14:56 CEST
Seat 1: Hero showed [Ks 9d] and lost with One Pair
Seat 3: 97a8e3a4 showed [3h 3d] and won (₮1.25) with Two Pair
Seat 4: 1636d8da folded before Flop (didn't bet)
Seat 5: 210220b6 folded before Flop (didn't bet)
Seat 6: 02b58bc5 folded before Flop (didn't bet)
```

#### Hand 6359930078 (RETURN)

Expected Hero result: n/a unsupported/skipped; Current parser result: n/a unsupported/skipped; Discrepancy: n/a.

```text
CoinPoker Hand #6359930078: NLH BombPot (₮0.01/₮0.02/₮0.08) 2026/06/07 20:14:02 CEST
Table '201367' 6-max Seat #2 is the button
Seat 1: f61b551e (₮2 in chips)
Seat 2: eccb30cc (₮2.61 in chips)
Seat 3: Hero (₮2.16 in chips)
Seat 4: f6f1da46 (₮1.74 in chips)
Seat 5: bdd33995 (₮2.81 in chips)
Seat 6: 33be6944 (₮2.08 in chips)
f61b551e: posts ante ₮0.08
eccb30cc: posts ante ₮0.08
Hero: posts ante ₮0.08
f6f1da46: posts ante ₮0.08
bdd33995: posts ante ₮0.08
33be6944: posts ante ₮0.08
*** HOLE CARDS ***
Dealt to f61b551e
Dealt to eccb30cc
Dealt to Hero [Ad 9d]
Dealt to f6f1da46
Dealt to bdd33995
Dealt to 33be6944
*** FIRST FLOP *** [2s 5c 6s]
*** SECOND FLOP *** [3c Kh Ac]
Hero: checks
f6f1da46: bets ₮0.20
bdd33995: folds
33be6944: folds
f61b551e: folds
eccb30cc: folds
Hero: calls ₮0.20
*** FIRST TURN *** [2s 5c 6s] [8s]
*** SECOND TURN *** [3c Kh Ac] [6c]
Hero: checks
f6f1da46: bets ₮0.66
Hero: folds
f6f1da46: RETURN ₮0.66
*** FIRST SHOWDOWN ***
f6f1da46 collected ₮0.42 from pot
*** SECOND SHOWDOWN ***
f6f1da46 collected ₮0.42 from pot
*** SUMMARY ***
Total pot ₮0.88 | Rake ₮0.04
Hand was run with two boards
FIRST Board [ 2s 5c 6s 8s ]
SECOND Board [ 3c Kh Ac 6c ]
Game ended: 2026/06/07 20:15:17 CEST
Seat 1: f61b551e folded on the Flop
Seat 2: eccb30cc folded on the Flop
Seat 3: Hero folded on the Turn
Seat 4: f6f1da46 won (₮0.42), and won (₮0.42)
Seat 5: bdd33995 folded on the Flop
Seat 6: 33be6944 folded on the Flop
```

#### Hand 6299122117 (RETURN)

Expected Hero result: 0.05; Current parser result: 0.05; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122117: NLH (₮0.01/₮0.02) 2026/06/07 20:15:02 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: Hero (₮2.39 in chips)
Seat 3: 70b44275 (₮1.25 in chips)
Seat 4: a4b8d879 (₮3.33 in chips)
Seat 5: b0306bad (₮2.03 in chips)
Seat 6: 6be64480 (₮2.29 in chips)
a4b8d879: posts small blind ₮0.01
b0306bad: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ah 5h]
Dealt to 70b44275
Dealt to a4b8d879
Dealt to b0306bad
Dealt to 6be64480
6be64480: folds
Hero: raises ₮0.03 to ₮0.05
70b44275: folds
a4b8d879: folds
b0306bad: calls ₮0.03
*** FLOP *** [3s 9h 6h]
b0306bad: checks
Hero: bets ₮0.04
b0306bad: folds
Hero: RETURN ₮0.04
*** SHOWDOWN ***
Hero collected ₮0.10 from pot
*** SUMMARY ***
Total pot ₮0.11 | Rake ₮0.01
Hand was run once
Board [ 3s 9h 6h ]
Game ended: 2026/06/07 20:15:36 CEST
Seat 1: Hero showed [Ah 5h] and won (₮0.10)
Seat 3: 70b44275 folded before Flop (didn't bet)
Seat 4: a4b8d879 folded before Flop (didn't bet)
Seat 5: b0306bad folded on the Flop
Seat 6: 6be64480 folded before Flop (didn't bet)
```

#### Hand 6359930079 (RETURN)

Expected Hero result: 0.15; Current parser result: 0.15; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930079: NLH (₮0.01/₮0.02) 2026/06/07 20:15:24 CEST
Table '201367' 6-max Seat #3 is the button
Seat 1: e4d07c61 (₮1.92 in chips)
Seat 2: 9c752e5a (₮2.53 in chips)
Seat 3: Hero (₮1.88 in chips)
Seat 4: 5d531b89 (₮2.30 in chips)
Seat 5: 4f625d27 (₮2.73 in chips)
Seat 6: 1e5e7cca (₮2 in chips)
5d531b89: posts small blind ₮0.01
4f625d27: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to e4d07c61
Dealt to 9c752e5a
Dealt to Hero [Ac 3c]
Dealt to 5d531b89
Dealt to 4f625d27
Dealt to 1e5e7cca
1e5e7cca: folds
e4d07c61: folds
9c752e5a: raises ₮0.03 to ₮0.05
Hero: calls ₮0.05
5d531b89: folds
4f625d27: calls ₮0.03
*** FLOP *** [5c Jh Qs]
4f625d27: checks
9c752e5a: bets ₮0.05
Hero: calls ₮0.05
4f625d27: folds
*** TURN *** [5c Jh Qs] [Kd]
9c752e5a: checks
Hero: bets ₮0.20
9c752e5a: folds
Hero: RETURN ₮0.20
*** SHOWDOWN ***
Hero collected ₮0.25 from pot
*** SUMMARY ***
Total pot ₮0.26 | Rake ₮0.01
Hand was run once
Board [ 5c Jh Qs Kd ]
Game ended: 2026/06/07 20:16:38 CEST
Seat 1: e4d07c61 folded before Flop (didn't bet)
Seat 2: 9c752e5a folded on the Turn
Seat 3: Hero showed [Ac 3c] and won (₮0.25)
Seat 4: 5d531b89 folded before Flop (didn't bet)
Seat 5: 4f625d27 folded on the Flop
Seat 6: 1e5e7cca folded before Flop (didn't bet)
```

#### Hand 6299122118 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122118: NLH (₮0.01/₮0.02) 2026/06/07 20:15:41 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: Hero (₮2.44 in chips)
Seat 3: 11cec8b2 (₮1.25 in chips)
Seat 4: 427fdf06 (₮3.32 in chips)
Seat 5: 8fdea36c (₮2 in chips)
Seat 6: 08622d3d (₮2.29 in chips)
8fdea36c: posts small blind ₮0.01
08622d3d: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [8h 3h]
Dealt to 11cec8b2
Dealt to 427fdf06
Dealt to 8fdea36c
Dealt to 08622d3d
Hero: folds
11cec8b2: folds
427fdf06: folds
8fdea36c: folds
08622d3d: RETURN ₮0.01
*** SHOWDOWN ***
08622d3d collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:15:54 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: 11cec8b2 folded before Flop (didn't bet)
Seat 4: 427fdf06 folded before Flop (didn't bet)
Seat 5: 8fdea36c folded before Flop (didn't bet)
Seat 6: 08622d3d won (₮0.02)
```

#### Hand 6299122119 (RETURN, ALLIN)

Expected Hero result: 0.34; Current parser result: 0.34; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122119: NLH (₮0.01/₮0.02) 2026/06/07 20:15:59 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: Hero (₮2.44 in chips)
Seat 3: dd25f436 (₮1.25 in chips)
Seat 4: 01bd3938 (₮3.32 in chips)
Seat 5: 92240ebd (₮2 in chips)
Seat 6: cdbad1df (₮2.30 in chips)
cdbad1df: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ad Qh]
Dealt to dd25f436
Dealt to 01bd3938
Dealt to 92240ebd
Dealt to cdbad1df
dd25f436: calls ₮0.02
01bd3938: folds
92240ebd: raises ₮0.08 to ₮0.10
cdbad1df: folds
Hero: calls ₮0.08
dd25f436: calls ₮0.08
*** FLOP *** [5c 2h 8s]
Hero: bets ₮0.16
dd25f436: calls ₮0.16
92240ebd: folds
*** TURN *** [5c 2h 8s] [9d]
Hero: checks
dd25f436: checks
*** RIVER *** [5c 2h 8s 9d] [Kh]
Hero: ALLIN ₮2.18
dd25f436: folds
Hero: RETURN ₮2.18
*** SHOWDOWN ***
Hero collected ₮0.60 from pot
*** SUMMARY ***
Total pot ₮0.63 | Rake ₮0.03
Hand was run once
Board [ 5c 2h 8s 9d Kh ]
Game ended: 2026/06/07 20:16:59 CEST
Seat 1: Hero showed [Ad Qh] and won (₮0.60)
Seat 3: dd25f436 folded on the River
Seat 4: 01bd3938 folded before Flop (didn't bet)
Seat 5: 92240ebd folded on the Flop
Seat 6: cdbad1df folded before Flop (didn't bet)
```

#### Hand 6359930080 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930080: NLH (₮0.01/₮0.02) 2026/06/07 20:16:43 CEST
Table '201367' 6-max Seat #4 is the button
Seat 1: 88d424d7 (₮1.92 in chips)
Seat 2: d9d5e075 (₮2.43 in chips)
Seat 3: Hero (₮2.03 in chips)
Seat 4: 67137016 (₮2.29 in chips)
Seat 5: f2c223e1 (₮2.68 in chips)
Seat 6: 8108c3e4 (₮2 in chips)
f2c223e1: posts small blind ₮0.01
8108c3e4: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 88d424d7
Dealt to d9d5e075
Dealt to Hero [Th 6h]
Dealt to 67137016
Dealt to f2c223e1
Dealt to 8108c3e4
88d424d7: calls ₮0.02
d9d5e075: raises ₮0.05 to ₮0.07
Hero: folds
67137016: folds
f2c223e1: folds
8108c3e4: folds
88d424d7: calls ₮0.05
*** FLOP *** [5d 7c 3c]
88d424d7: checks
d9d5e075: bets ₮0.13
88d424d7: folds
d9d5e075: RETURN ₮0.13
*** SHOWDOWN ***
d9d5e075 collected ₮0.16 from pot
*** SUMMARY ***
Total pot ₮0.17 | Rake ₮0.01
Hand was run once
Board [ 5d 7c 3c ]
Game ended: 2026/06/07 20:17:24 CEST
Seat 1: 88d424d7 folded on the Flop
Seat 2: d9d5e075 won (₮0.16)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 67137016 folded before Flop (didn't bet)
Seat 5: f2c223e1 folded before Flop (didn't bet)
Seat 6: 8108c3e4 folded before Flop (didn't bet)
```

#### Hand 6299122120 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122120: NLH (₮0.01/₮0.02) 2026/06/07 20:17:04 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: Hero (₮2.78 in chips)
Seat 3: a1e84760 (₮0.99 in chips)
Seat 4: 017feabb (₮3.32 in chips)
Seat 5: 0c1abe19 (₮2 in chips)
Seat 6: 8c1606bb (₮2.29 in chips)
Hero: posts small blind ₮0.01
a1e84760: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [4c 3h]
Dealt to a1e84760
Dealt to 017feabb
Dealt to 0c1abe19
Dealt to 8c1606bb
017feabb: folds
0c1abe19: folds
8c1606bb: folds
Hero: folds
a1e84760: RETURN ₮0.01
*** SHOWDOWN ***
a1e84760 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:17:16 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: a1e84760 won (₮0.02)
Seat 4: 017feabb folded before Flop (didn't bet)
Seat 5: 0c1abe19 folded before Flop (didn't bet)
Seat 6: 8c1606bb folded before Flop (didn't bet)
```

#### Hand 6299122121 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122121: NLH (₮0.01/₮0.02) 2026/06/07 20:17:21 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: Hero (₮2.77 in chips)
Seat 3: a5a7e411 (₮1 in chips)
Seat 4: 0a516129 (₮3.32 in chips)
Seat 5: b833839e (₮2 in chips)
Seat 6: 8464d934 (₮2.29 in chips)
a5a7e411: posts small blind ₮0.01
0a516129: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Qh 8s]
Dealt to a5a7e411
Dealt to 0a516129
Dealt to b833839e
Dealt to 8464d934
b833839e: raises ₮0.02 to ₮0.04
8464d934: folds
Hero: folds
a5a7e411: folds
0a516129: calls ₮0.02
*** FLOP *** [9d Ad 3h]
0a516129: checks
b833839e: bets ₮0.03
0a516129: calls ₮0.03
*** TURN *** [9d Ad 3h] [3c]
0a516129: checks
b833839e: bets ₮0.11
0a516129: folds
b833839e: RETURN ₮0.11
*** SHOWDOWN ***
b833839e collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0.01
Hand was run once
Board [ 9d Ad 3h 3c ]
Game ended: 2026/06/07 20:18:04 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: a5a7e411 folded before Flop (didn't bet)
Seat 4: 0a516129 folded on the Turn
Seat 5: b833839e won (₮0.14)
Seat 6: 8464d934 folded before Flop (didn't bet)
```

#### Hand 6359930081 (RETURN, ALLIN)

Expected Hero result: 0.45; Current parser result: 0.45; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930081: NLH (₮0.01/₮0.02) 2026/06/07 20:17:29 CEST
Table '201367' 6-max Seat #5 is the button
Seat 1: b4fb80cb (₮1.85 in chips)
Seat 2: 0d4b8ed4 (₮2.52 in chips)
Seat 3: Hero (₮2.03 in chips)
Seat 4: e176263c (₮2.29 in chips)
Seat 5: 8f2284e4 (₮2.67 in chips)
Seat 6: 6cb27531 (₮1.98 in chips)
6cb27531: posts small blind ₮0.01
b4fb80cb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to b4fb80cb
Dealt to 0d4b8ed4
Dealt to Hero [Qd Jh]
Dealt to e176263c
Dealt to 8f2284e4
Dealt to 6cb27531
0d4b8ed4: folds
Hero: raises ₮0.03 to ₮0.05
e176263c: calls ₮0.05
8f2284e4: folds
6cb27531: folds
b4fb80cb: folds
*** FLOP *** [8c 7c 3d]
Hero: bets ₮0.06
e176263c: calls ₮0.06
*** TURN *** [8c 7c 3d] [6s]
Hero: checks
e176263c: bets ₮0.12
Hero: raises ₮0.24 to ₮0.36
e176263c: calls ₮0.24
*** RIVER *** [8c 7c 3d 6s] [As]
Hero: ALLIN ₮1.56
e176263c: folds
Hero: RETURN ₮1.56
*** SHOWDOWN ***
Hero collected ₮0.92 from pot
*** SUMMARY ***
Total pot ₮0.97 | Rake ₮0.05
Hand was run once
Board [ 8c 7c 3d 6s As ]
Game ended: 2026/06/07 20:18:44 CEST
Seat 1: b4fb80cb folded before Flop (didn't bet)
Seat 2: 0d4b8ed4 folded before Flop (didn't bet)
Seat 3: Hero showed [Qd Jh] and won (₮0.92)
Seat 4: e176263c folded on the River
Seat 5: 8f2284e4 folded before Flop (didn't bet)
Seat 6: 6cb27531 folded before Flop (didn't bet)
```

#### Hand 6299122122 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122122: NLH (₮0.01/₮0.02) 2026/06/07 20:18:09 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: Hero (₮2.77 in chips)
Seat 3: 20837017 (₮0.99 in chips)
Seat 4: dc9e96e7 (₮3.25 in chips)
Seat 5: f0ee8ab0 (₮2.07 in chips)
Seat 6: f9e904eb (₮2.29 in chips)
dc9e96e7: posts small blind ₮0.01
f0ee8ab0: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [6c 2c]
Dealt to 20837017
Dealt to dc9e96e7
Dealt to f0ee8ab0
Dealt to f9e904eb
f9e904eb: folds
Hero: folds
20837017: folds
dc9e96e7: raises ₮0.02 to ₮0.04
f0ee8ab0: folds
dc9e96e7: RETURN ₮0.02
*** SHOWDOWN ***
dc9e96e7 collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:18:37 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: 20837017 folded before Flop (didn't bet)
Seat 4: dc9e96e7 won (₮0.04)
Seat 5: f0ee8ab0 folded before Flop (didn't bet)
Seat 6: f9e904eb folded before Flop (didn't bet)
```

#### Hand 6299122123 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122123: NLH (₮0.01/₮0.02) 2026/06/07 20:18:42 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: Hero (₮2.77 in chips)
Seat 3: e2df0b67 (₮0.99 in chips)
Seat 4: 0d745054 (₮3.27 in chips)
Seat 5: 7858d9e4 (₮2.05 in chips)
Seat 6: 1775a4a2 (₮2.29 in chips)
7858d9e4: posts small blind ₮0.01
1775a4a2: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ah 8c]
Dealt to e2df0b67
Dealt to 0d745054
Dealt to 7858d9e4
Dealt to 1775a4a2
Hero: folds
e2df0b67: folds
0d745054: folds
7858d9e4: folds
1775a4a2: RETURN ₮0.01
*** SHOWDOWN ***
1775a4a2 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/07 20:18:55 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 3: e2df0b67 folded before Flop (didn't bet)
Seat 4: 0d745054 folded before Flop (didn't bet)
Seat 5: 7858d9e4 folded before Flop (didn't bet)
Seat 6: 1775a4a2 won (₮0.02)
```

#### Hand 6359930082 (RETURN)

Expected Hero result: -0.05; Current parser result: -0.05; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930082: NLH (₮0.01/₮0.02) 2026/06/07 20:18:49 CEST
Table '201367' 6-max Seat #6 is the button
Seat 1: e63f16ec (₮1.83 in chips)
Seat 2: a53790e2 (₮2.52 in chips)
Seat 3: Hero (₮2.48 in chips)
Seat 4: 65435674 (₮1.82 in chips)
Seat 5: 60a376c5 (₮2.67 in chips)
Seat 6: 930f0320 (₮2 in chips)
e63f16ec: posts small blind ₮0.01
a53790e2: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to e63f16ec
Dealt to a53790e2
Dealt to Hero [6d 5d]
Dealt to 65435674
Dealt to 60a376c5
Dealt to 930f0320
Hero: raises ₮0.03 to ₮0.05
65435674: folds
60a376c5: folds
930f0320: folds
e63f16ec: calls ₮0.04
a53790e2: calls ₮0.03
*** FLOP *** [Qd 5c Ah]
e63f16ec: bets ₮0.08
a53790e2: folds
Hero: folds
e63f16ec: RETURN ₮0.08
*** SHOWDOWN ***
e63f16ec collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0.01
Hand was run once
Board [ Qd 5c Ah ]
Game ended: 2026/06/07 20:19:36 CEST
Seat 1: e63f16ec won (₮0.14)
Seat 2: a53790e2 folded on the Flop
Seat 3: Hero folded on the Flop
Seat 4: 65435674 folded before Flop (didn't bet)
Seat 5: 60a376c5 folded before Flop (didn't bet)
Seat 6: 930f0320 folded before Flop (didn't bet)
```

#### Hand 6299122124 (RETURN, ALLIN)

Expected Hero result: 2.46; Current parser result: 2.46; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122124: NLH (₮0.01/₮0.02) 2026/06/07 20:19:00 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: Hero (₮2.77 in chips)
Seat 3: dbcf6555 (₮0.99 in chips)
Seat 4: 63283902 (₮3.27 in chips)
Seat 5: 52f702ef (₮2.04 in chips)
Seat 6: 4623e1e4 (₮2.30 in chips)
4623e1e4: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ks Qs]
Dealt to dbcf6555
Dealt to 63283902
Dealt to 52f702ef
Dealt to 4623e1e4
dbcf6555: calls ₮0.02
63283902: folds
52f702ef: raises ₮0.02 to ₮0.04
4623e1e4: raises ₮0.14 to ₮0.18
Hero: calls ₮0.16
dbcf6555: calls ₮0.16
52f702ef: calls ₮0.14
*** FLOP *** [3d Jd Qh]
4623e1e4: bets ₮0.36
Hero: calls ₮0.36
dbcf6555: folds
52f702ef: folds
*** TURN *** [3d Jd Qh] [2s]
4623e1e4: bets ₮0.88
Hero: ALLIN ₮2.23
4623e1e4: ALLIN ₮0.88
Hero: RETURN ₮0.47
*** RIVER *** [3d Jd Qh 2s] [6h]
*** SHOWDOWN ***
Hero: shows [Ks Qs] (One Pair)
Hero collected ₮4.76 from pot
4623e1e4: shows [Ac Kc] (High Card)
*** SUMMARY ***
Total pot ₮4.96 | Rake ₮0.20
Hand was run once
Board [ 3d Jd Qh 2s 6h ]
Game ended: 2026/06/07 20:20:26 CEST
Seat 1: Hero showed [Ks Qs] and won (₮4.76) with One Pair
Seat 3: dbcf6555 folded on the Flop
Seat 4: 63283902 folded before Flop (didn't bet)
Seat 5: 52f702ef folded on the Flop
Seat 6: 4623e1e4 showed [Ac Kc] and lost with High Card
```

#### Hand 6359930083 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930083: NLH (₮0.01/₮0.02) 2026/06/07 20:19:41 CEST
Table '201367' 6-max Seat #1 is the button
Seat 1: 8d4e7479 (₮1.92 in chips)
Seat 2: 107ea845 (₮2.47 in chips)
Seat 3: Hero (₮2.43 in chips)
Seat 4: cd1a86eb (₮1.82 in chips)
Seat 5: aa8b5668 (₮2.67 in chips)
Seat 6: cbbcf932 (₮2 in chips)
107ea845: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 8d4e7479
Dealt to 107ea845
Dealt to Hero [9d 7c]
Dealt to cd1a86eb
Dealt to aa8b5668
Dealt to cbbcf932
cd1a86eb: folds
aa8b5668: folds
cbbcf932: folds
8d4e7479: calls ₮0.02
107ea845: folds
Hero: checks
*** FLOP *** [Qc 6c 4h]
Hero: checks
8d4e7479: bets ₮0.02
Hero: folds
8d4e7479: RETURN ₮0.02
*** SHOWDOWN ***
8d4e7479 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [ Qc 6c 4h ]
Game ended: 2026/06/07 20:20:27 CEST
Seat 1: 8d4e7479 won (₮0.05)
Seat 2: 107ea845 folded before Flop (didn't bet)
Seat 3: Hero folded on the Flop
Seat 4: cd1a86eb folded before Flop (didn't bet)
Seat 5: aa8b5668 folded before Flop (didn't bet)
Seat 6: cbbcf932 folded before Flop (didn't bet)
```

#### Hand 6359930084 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6359930084: NLH (₮0.01/₮0.02) 2026/06/07 20:20:32 CEST
Table '201367' 6-max Seat #2 is the button
Seat 3: Hero (₮2.41 in chips)
Seat 1: 37902123 (₮1.95 in chips)
Seat 2: 978108bc (₮2.46 in chips)
Seat 4: 2a95ebf4 (₮1.82 in chips)
Seat 5: 67fcec38 (₮2.67 in chips)
Seat 6: 2c46bfce (₮2 in chips)
Hero: posts small blind ₮0.01
2a95ebf4: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Kd 7s]
Dealt to 37902123
Dealt to 978108bc
Dealt to 2a95ebf4
Dealt to 67fcec38
Dealt to 2c46bfce
67fcec38: raises ₮0.04 to ₮0.06
2c46bfce: folds
37902123: folds
978108bc: raises ₮0.12 to ₮0.18
Hero: folds
2a95ebf4: folds
67fcec38: calls ₮0.12
*** FLOP *** [8c 2h Qd]
67fcec38: bets ₮0.20
978108bc: raises ₮0.40 to ₮0.60
67fcec38: folds
978108bc: RETURN ₮0.40
*** SHOWDOWN ***
978108bc collected ₮0.75 from pot
*** SUMMARY ***
Total pot ₮0.79 | Rake ₮0.04
Hand was run once
Board [ 8c 2h Qd ]
Game ended: 2026/06/07 20:21:18 CEST
Seat 3: Hero folded before Flop (didn't bet)
Seat 1: 37902123 folded before Flop (didn't bet)
Seat 2: 978108bc won (₮0.75)
Seat 4: 2a95ebf4 folded before Flop (didn't bet)
Seat 5: 67fcec38 folded on the Flop
Seat 6: 2c46bfce folded before Flop (didn't bet)
```

#### Hand 6299122125 (ALLIN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6299122125: NLH (₮0.01/₮0.02) 2026/06/07 20:20:32 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: Hero (₮5.23 in chips)
Seat 6: 781041be (₮2 in chips)
Seat 3: 8e6dd3c9 (₮0.81 in chips)
Seat 4: 5bb6d488 (₮3.27 in chips)
Seat 5: 01466912 (₮2 in chips)
Hero: posts small blind ₮0.01
8e6dd3c9: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Qs 7h]
Dealt to 781041be
Dealt to 8e6dd3c9
Dealt to 5bb6d488
Dealt to 01466912
5bb6d488: folds
01466912: raises ₮0.03 to ₮0.05
781041be: ALLIN ₮2
Hero: folds
8e6dd3c9: folds
01466912: ALLIN ₮1.95
*** FLOP *** [9s 3s 3c]
*** TURN *** [9s 3s 3c] [9h]
*** RIVER *** [9s 3s 3c 9h] [8h]
*** SHOWDOWN ***
01466912: shows [Kc Kh] (Two Pair)
01466912 collected ₮3.83 from pot
781041be: shows [Ad Qc] (Two Pair)
*** SUMMARY ***
Total pot ₮4.03 | Rake ₮0.20
Hand was run once
Board [ 9s 3s 3c 9h 8h ]
Game ended: 2026/06/07 20:21:21 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 6: 781041be showed [Ad Qc] and lost with Two Pair
Seat 3: 8e6dd3c9 folded before Flop (didn't bet)
Seat 4: 5bb6d488 folded before Flop (didn't bet)
Seat 5: 01466912 showed [Kc Kh] and won (₮3.83) with Two Pair
```

#### Hand 6375710043 (RETURN)

Expected Hero result: 0.01; Current parser result: 0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710043: NLH (₮0.01/₮0.02) 2026/06/08 01:10:32 CEST
Table '200588' 6-max Seat #2 is the button
Seat 2: 7791c012 (₮2 in chips)
Seat 4: c3be7f39 (₮1.81 in chips)
Seat 5: Hero (₮2 in chips)
Seat 6: 78f69ed0 (₮1.56 in chips)
c3be7f39: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 7791c012
Dealt to c3be7f39
Dealt to Hero [Th Tc]
Dealt to 78f69ed0
78f69ed0: folds
7791c012: folds
c3be7f39: folds
Hero: RETURN ₮0.01
*** SHOWDOWN ***
Hero collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:10:43 CEST
Seat 2: 7791c012 folded before Flop (didn't bet)
Seat 4: c3be7f39 folded before Flop (didn't bet)
Seat 5: Hero showed [Th Tc] and won (₮0.02)
Seat 6: 78f69ed0 folded before Flop (didn't bet)
```

#### Hand 6375710044 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710044: NLH (₮0.01/₮0.02) 2026/06/08 01:10:48 CEST
Table '200588' 6-max Seat #4 is the button
Seat 2: dae17012 (₮2 in chips)
Seat 4: c363b190 (₮1.80 in chips)
Seat 5: Hero (₮2.01 in chips)
Seat 6: 046f3755 (₮1.56 in chips)
Hero: posts small blind ₮0.01
046f3755: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to dae17012
Dealt to c363b190
Dealt to Hero [6h 2c]
Dealt to 046f3755
dae17012: raises ₮0.03 to ₮0.05
c363b190: folds
Hero: folds
046f3755: calls ₮0.03
*** FLOP *** [9c Jd 4c]
046f3755: checks
dae17012: checks
*** TURN *** [9c Jd 4c] [2d]
046f3755: bets ₮0.04
dae17012: calls ₮0.04
*** RIVER *** [9c Jd 4c 2d] [2s]
046f3755: checks
dae17012: bets ₮0.25
046f3755: folds
dae17012: RETURN ₮0.25
*** SHOWDOWN ***
dae17012 collected ₮0.18 from pot
*** SUMMARY ***
Total pot ₮0.19 | Rake ₮0.01
Hand was run once
Board [ 9c Jd 4c 2d 2s ]
Game ended: 2026/06/08 01:11:31 CEST
Seat 2: dae17012 won (₮0.18)
Seat 4: c363b190 folded before Flop (didn't bet)
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: 046f3755 folded on the River
```

#### Hand 6375710045 (RETURN)

Expected Hero result: -0.17; Current parser result: -0.17; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710045: NLH (₮0.01/₮0.02) 2026/06/08 01:11:35 CEST
Table '200588' 6-max Seat #5 is the button
Seat 4: 5c50d531 (₮1.80 in chips)
Seat 1: 2cbcf327 (₮2 in chips)
Seat 2: 528030fb (₮2.09 in chips)
Seat 5: Hero (₮2 in chips)
Seat 6: fc95470f (₮1.47 in chips)
fc95470f: posts small blind ₮0.01
2cbcf327: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 5c50d531
Dealt to 2cbcf327
Dealt to 528030fb
Dealt to Hero [Kc Td]
Dealt to fc95470f
528030fb: folds
5c50d531: folds
Hero: raises ₮0.03 to ₮0.05
fc95470f: raises ₮0.03 to ₮0.08
2cbcf327: folds
Hero: calls ₮0.03
*** FLOP *** [4h 6s Qh]
fc95470f: checks
Hero: bets ₮0.09
fc95470f: calls ₮0.09
*** TURN *** [4h 6s Qh] [5h]
fc95470f: bets ₮0.12
Hero: folds
fc95470f: RETURN ₮0.12
*** SHOWDOWN ***
fc95470f collected ₮0.34 from pot
*** SUMMARY ***
Total pot ₮0.36 | Rake ₮0.02
Hand was run once
Board [ 4h 6s Qh 5h ]
Game ended: 2026/06/08 01:12:24 CEST
Seat 4: 5c50d531 folded before Flop (didn't bet)
Seat 1: 2cbcf327 folded before Flop (didn't bet)
Seat 2: 528030fb folded before Flop (didn't bet)
Seat 5: Hero folded on the Turn
Seat 6: fc95470f won (₮0.34)
```

#### Hand 6375710046 (RETURN)

Expected Hero result: 0.14; Current parser result: 0.14; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710046: NLH (₮0.01/₮0.02) 2026/06/08 01:12:29 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: 1ff7d4e6 (₮2 in chips)
Seat 2: 90b25fd8 (₮2.09 in chips)
Seat 5: Hero (₮2 in chips)
Seat 6: 0979dd09 (₮1.64 in chips)
1ff7d4e6: posts small blind ₮0.01
90b25fd8: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 1ff7d4e6
Dealt to 90b25fd8
Dealt to Hero [Kd Qd]
Dealt to 0979dd09
Hero: raises ₮0.03 to ₮0.05
0979dd09: folds
1ff7d4e6: calls ₮0.04
90b25fd8: calls ₮0.03
*** FLOP *** [Jd 6s Ah]
1ff7d4e6: checks
90b25fd8: checks
Hero: bets ₮0.05
1ff7d4e6: calls ₮0.05
90b25fd8: folds
*** TURN *** [Jd 6s Ah] [Ac]
1ff7d4e6: checks
Hero: bets ₮0.19
1ff7d4e6: folds
Hero: RETURN ₮0.19
*** SHOWDOWN ***
Hero collected ₮0.24 from pot
*** SUMMARY ***
Total pot ₮0.25 | Rake ₮0.01
Hand was run once
Board [ Jd 6s Ah Ac ]
Game ended: 2026/06/08 01:13:14 CEST
Seat 1: 1ff7d4e6 folded on the Turn
Seat 2: 90b25fd8 folded on the Flop
Seat 5: Hero showed [Kd Qd] and won (₮0.24)
Seat 6: 0979dd09 folded before Flop (didn't bet)
```

#### Hand 6375710049 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710049: NLH (₮0.01/₮0.02) 2026/06/08 01:15:13 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: 04e01ad5 (₮2 in chips)
Seat 2: 032daca1 (₮2.19 in chips)
Seat 5: Hero (₮2.11 in chips)
Seat 6: 24b0aad3 (₮1.55 in chips)
24b0aad3: posts small blind ₮0.01
04e01ad5: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 04e01ad5
Dealt to 032daca1
Dealt to Hero [5d 3h]
Dealt to 24b0aad3
032daca1: raises ₮0.03 to ₮0.05
Hero: folds
24b0aad3: raises ₮0.03 to ₮0.08
04e01ad5: folds
032daca1: calls ₮0.03
*** FLOP *** [5c 5s Jd]
24b0aad3: checks
032daca1: bets ₮0.06
24b0aad3: calls ₮0.06
*** TURN *** [5c 5s Jd] [Kh]
24b0aad3: checks
032daca1: bets ₮0.10
24b0aad3: calls ₮0.10
*** RIVER *** [5c 5s Jd Kh] [Kc]
24b0aad3: bets ₮0.50
032daca1: folds
24b0aad3: RETURN ₮0.50
*** SHOWDOWN ***
24b0aad3 collected ₮0.48 from pot
*** SUMMARY ***
Total pot ₮0.50 | Rake ₮0.02
Hand was run once
Board [ 5c 5s Jd Kh Kc ]
Game ended: 2026/06/08 01:16:08 CEST
Seat 1: 04e01ad5 folded before Flop (didn't bet)
Seat 2: 032daca1 folded on the River
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: 24b0aad3 won (₮0.48)
```

#### Hand 6375710050 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710050: NLH (₮0.01/₮0.02) 2026/06/08 01:16:13 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: 776e45b1 (₮2 in chips)
Seat 2: b563fbd7 (₮1.95 in chips)
Seat 5: Hero (₮2.11 in chips)
Seat 6: 99dd7aab (₮1.79 in chips)
776e45b1: posts small blind ₮0.01
b563fbd7: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 776e45b1
Dealt to b563fbd7
Dealt to Hero [8s 6s]
Dealt to 99dd7aab
Hero: folds
99dd7aab: calls ₮0.02
776e45b1: raises ₮0.04 to ₮0.06
b563fbd7: folds
99dd7aab: calls ₮0.04
*** FLOP *** [7d 2d Kc]
776e45b1: bets ₮0.10
99dd7aab: folds
776e45b1: RETURN ₮0.10
*** SHOWDOWN ***
776e45b1 collected ₮0.13 from pot
*** SUMMARY ***
Total pot ₮0.14 | Rake ₮0.01
Hand was run once
Board [ 7d 2d Kc ]
Game ended: 2026/06/08 01:16:53 CEST
Seat 1: 776e45b1 won (₮0.13)
Seat 2: b563fbd7 folded before Flop (didn't bet)
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: 99dd7aab folded on the Flop
```

#### Hand 6375710051 (RETURN)

Expected Hero result: 0.25; Current parser result: 0.25; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710051: NLH (₮0.01/₮0.02) 2026/06/08 01:16:58 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 76f86965 (₮2.07 in chips)
Seat 2: 4af92ecb (₮1.93 in chips)
Seat 5: Hero (₮2.11 in chips)
Seat 6: b34da6f7 (₮1.73 in chips)
4af92ecb: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 76f86965
Dealt to 4af92ecb
Dealt to Hero [2s 2c]
Dealt to b34da6f7
b34da6f7: calls ₮0.02
76f86965: folds
4af92ecb: raises ₮0.07 to ₮0.09
Hero: calls ₮0.07
b34da6f7: calls ₮0.07
*** FLOP *** [Js 3d 4c]
4af92ecb: checks
Hero: bets ₮0.09
b34da6f7: folds
4af92ecb: calls ₮0.09
*** TURN *** [Js 3d 4c] [9d]
4af92ecb: checks
Hero: checks
*** RIVER *** [Js 3d 4c 9d] [Qs]
4af92ecb: checks
Hero: bets ₮0.34
4af92ecb: folds
Hero: RETURN ₮0.34
*** SHOWDOWN ***
Hero collected ₮0.43 from pot
*** SUMMARY ***
Total pot ₮0.45 | Rake ₮0.02
Hand was run once
Board [ Js 3d 4c 9d Qs ]
Game ended: 2026/06/08 01:18:21 CEST
Seat 1: 76f86965 folded before Flop (didn't bet)
Seat 2: 4af92ecb folded on the River
Seat 5: Hero showed [2s 2c] and won (₮0.43)
Seat 6: b34da6f7 folded on the Flop
```

#### Hand 6375710053 (RETURN)

Expected Hero result: -0.25; Current parser result: -0.25; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710053: NLH (₮0.01/₮0.02) 2026/06/08 01:19:11 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: ca906ed8 (₮2.07 in chips)
Seat 2: 1b57a5f4 (₮2 in chips)
Seat 5: Hero (₮2.31 in chips)
Seat 6: 45e6322a (₮1.97 in chips)
45e6322a: posts small blind ₮0.01
ca906ed8: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to ca906ed8
Dealt to 1b57a5f4
Dealt to Hero [8h 7d]
Dealt to 45e6322a
1b57a5f4: raises ₮0.03 to ₮0.05
Hero: calls ₮0.05
45e6322a: calls ₮0.04
ca906ed8: folds
*** FLOP *** [Qh 9s Qd]
45e6322a: checks
1b57a5f4: bets ₮0.06
Hero: raises ₮0.14 to ₮0.20
45e6322a: folds
1b57a5f4: calls ₮0.14
*** TURN *** [Qh 9s Qd] [Th]
1b57a5f4: checks
Hero: checks
*** RIVER *** [Qh 9s Qd Th] [4d]
1b57a5f4: bets ₮0.15
Hero: folds
1b57a5f4: RETURN ₮0.15
*** SHOWDOWN ***
1b57a5f4 collected ₮0.54 from pot
*** SUMMARY ***
Total pot ₮0.57 | Rake ₮0.03
Hand was run once
Board [ Qh 9s Qd Th 4d ]
Game ended: 2026/06/08 01:20:23 CEST
Seat 1: ca906ed8 folded before Flop (didn't bet)
Seat 2: 1b57a5f4 won (₮0.54)
Seat 5: Hero folded on the River
Seat 6: 45e6322a folded on the Flop
```

#### Hand 6375710054 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710054: NLH (₮0.01/₮0.02) 2026/06/08 01:20:28 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: 10a11f7b (₮2.05 in chips)
Seat 2: d1f14796 (₮2.29 in chips)
Seat 5: Hero (₮2.06 in chips)
Seat 6: 0ddf6713 (₮1.92 in chips)
10a11f7b: posts small blind ₮0.01
d1f14796: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 10a11f7b
Dealt to d1f14796
Dealt to Hero [9d 4d]
Dealt to 0ddf6713
Hero: folds
0ddf6713: folds
10a11f7b: folds
d1f14796: RETURN ₮0.01
*** SHOWDOWN ***
d1f14796 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:20:36 CEST
Seat 1: 10a11f7b folded before Flop (didn't bet)
Seat 2: d1f14796 won (₮0.02)
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: 0ddf6713 folded before Flop (didn't bet)
```

#### Hand 6375710055 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710055: NLH (₮0.01/₮0.02) 2026/06/08 01:20:41 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 7c042d8e (₮2.04 in chips)
Seat 2: 5fdaa7ce (₮2.30 in chips)
Seat 5: Hero (₮2.06 in chips)
Seat 6: 2f3ca153 (₮1.92 in chips)
5fdaa7ce: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 7c042d8e
Dealt to 5fdaa7ce
Dealt to Hero [Qh 4d]
Dealt to 2f3ca153
2f3ca153: calls ₮0.02
7c042d8e: folds
5fdaa7ce: raises ₮0.07 to ₮0.09
Hero: folds
2f3ca153: folds
5fdaa7ce: RETURN ₮0.07
*** SHOWDOWN ***
5fdaa7ce collected ₮0.06 from pot
*** SUMMARY ***
Total pot ₮0.06 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:21:03 CEST
Seat 1: 7c042d8e folded before Flop (didn't bet)
Seat 2: 5fdaa7ce won (₮0.06)
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: 2f3ca153 folded before Flop (didn't bet)
```

#### Hand 6375710056 (RETURN)

Expected Hero result: 0.07; Current parser result: 0.07; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710056: NLH (₮0.01/₮0.02) 2026/06/08 01:21:08 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 55f6594b (₮2.04 in chips)
Seat 2: 9b3820f1 (₮2.34 in chips)
Seat 5: Hero (₮2.04 in chips)
Seat 6: 9e17d2da (₮1.90 in chips)
Hero: posts small blind ₮0.01
9e17d2da: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 55f6594b
Dealt to 9b3820f1
Dealt to Hero [Ad 4h]
Dealt to 9e17d2da
55f6594b: folds
9b3820f1: folds
Hero: raises ₮0.03 to ₮0.05
9e17d2da: calls ₮0.03
*** FLOP *** [4s 5h 9h]
Hero: checks
9e17d2da: checks
*** TURN *** [4s 5h 9h] [2s]
Hero: bets ₮0.03
9e17d2da: calls ₮0.03
*** RIVER *** [4s 5h 9h 2s] [As]
Hero: bets ₮0.08
9e17d2da: folds
Hero: RETURN ₮0.08
*** SHOWDOWN ***
Hero collected ₮0.15 from pot
*** SUMMARY ***
Total pot ₮0.16 | Rake ₮0.01
Hand was run once
Board [ 4s 5h 9h 2s As ]
Game ended: 2026/06/08 01:22:04 CEST
Seat 1: 55f6594b folded before Flop (didn't bet)
Seat 2: 9b3820f1 folded before Flop (didn't bet)
Seat 5: Hero showed [Ad 4h] and won (₮0.15)
Seat 6: 9e17d2da folded on the River
```

#### Hand 6375710057 (RETURN, auto big blind)

Expected Hero result: 0.49; Current parser result: 0.49; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710057: NLH (₮0.01/₮0.02) 2026/06/08 01:22:09 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: 529d0bb9 (₮2.04 in chips)
Seat 2: ce691d70 (₮2.34 in chips)
Seat 3: 8a5ff052 (₮0.80 in chips)
Seat 4: e98404ab (₮2 in chips)
Seat 5: Hero (₮2.11 in chips)
Seat 6: d959ea80 (₮1.82 in chips)
d959ea80: posts small blind ₮0.01
529d0bb9: posts big blind ₮0.02
8a5ff052: posts auto big blind ₮0.02
e98404ab: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to 529d0bb9
Dealt to ce691d70
Dealt to 8a5ff052
Dealt to e98404ab
Dealt to Hero [Ts 9s]
Dealt to d959ea80
ce691d70: calls ₮0.02
8a5ff052: checks
e98404ab: checks
Hero: raises ₮0.06 to ₮0.08
d959ea80: calls ₮0.07
529d0bb9: calls ₮0.06
ce691d70: calls ₮0.06
8a5ff052: folds
e98404ab: folds
*** FLOP *** [Qs 8h Js]
d959ea80: checks
529d0bb9: checks
ce691d70: checks
Hero: bets ₮0.08
d959ea80: raises ₮0.17 to ₮0.25
529d0bb9: folds
ce691d70: folds
Hero: calls ₮0.17
*** TURN *** [Qs 8h Js] [9h]
d959ea80: checks
Hero: checks
*** RIVER *** [Qs 8h Js 9h] [Kc]
d959ea80: checks
Hero: bets ₮0.43
d959ea80: folds
Hero: RETURN ₮0.43
*** SHOWDOWN ***
Hero collected ₮0.82 from pot
*** SUMMARY ***
Total pot ₮0.86 | Rake ₮0.04
Hand was run once
Board [ Qs 8h Js 9h Kc ]
Game ended: 2026/06/08 01:23:44 CEST
Seat 1: 529d0bb9 folded on the Flop
Seat 2: ce691d70 folded on the Flop
Seat 3: 8a5ff052 folded before Flop (didn't bet)
Seat 4: e98404ab folded before Flop (didn't bet)
Seat 5: Hero showed [Ts 9s] and won (₮0.82)
Seat 6: d959ea80 folded on the River
```

#### Hand 6375710059 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710059: NLH (₮0.01/₮0.02) 2026/06/08 01:25:03 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 90d29810 (₮2 in chips)
Seat 2: 70cfcc5e (₮2.24 in chips)
Seat 3: a7943248 (₮0.56 in chips)
Seat 4: 9e20f4b9 (₮2 in chips)
Seat 5: Hero (₮1.86 in chips)
Seat 6: 367d429a (₮2.39 in chips)
70cfcc5e: posts small blind ₮0.01
a7943248: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 90d29810
Dealt to 70cfcc5e
Dealt to a7943248
Dealt to 9e20f4b9
Dealt to Hero [8c 6c]
Dealt to 367d429a
9e20f4b9: calls ₮0.02
Hero: calls ₮0.02
367d429a: calls ₮0.02
90d29810: folds
70cfcc5e: folds
a7943248: checks
*** FLOP *** [8h Js Qh]
a7943248: bets ₮0.04
9e20f4b9: folds
Hero: folds
367d429a: calls ₮0.04
*** TURN *** [8h Js Qh] [Kc]
a7943248: bets ₮0.08
367d429a: calls ₮0.08
*** RIVER *** [8h Js Qh Kc] [Kd]
a7943248: bets ₮0.33
367d429a: folds
a7943248: RETURN ₮0.33
*** SHOWDOWN ***
a7943248 collected ₮0.31 from pot
*** SUMMARY ***
Total pot ₮0.33 | Rake ₮0.02
Hand was run once
Board [ 8h Js Qh Kc Kd ]
Game ended: 2026/06/08 01:25:54 CEST
Seat 1: 90d29810 folded before Flop (didn't bet)
Seat 2: 70cfcc5e folded before Flop (didn't bet)
Seat 3: a7943248 won (₮0.31)
Seat 4: 9e20f4b9 folded on the Flop
Seat 5: Hero folded on the Flop
Seat 6: 367d429a folded on the River
```

#### Hand 6375710060 (ALLIN)

Expected Hero result: -0.20; Current parser result: -0.20; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710060: NLH (₮0.01/₮0.02) 2026/06/08 01:25:59 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: f8298aec (₮2 in chips)
Seat 2: 861badd7 (₮2.23 in chips)
Seat 3: e2f79187 (₮0.73 in chips)
Seat 4: f66a7aef (₮2 in chips)
Seat 5: Hero (₮2 in chips)
Seat 6: e13bc911 (₮2.25 in chips)
e2f79187: posts small blind ₮0.01
f66a7aef: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to f8298aec
Dealt to 861badd7
Dealt to e2f79187
Dealt to f66a7aef
Dealt to Hero [Ac 3c]
Dealt to e13bc911
Hero: raises ₮0.03 to ₮0.05
e13bc911: calls ₮0.05
f8298aec: folds
861badd7: raises ₮0.15 to ₮0.20
e2f79187: calls ₮0.19
f66a7aef: folds
Hero: calls ₮0.15
e13bc911: calls ₮0.15
*** FLOP *** [8s Jh 7s]
e2f79187: ALLIN ₮0.53
Hero: folds
e13bc911: calls ₮0.53
861badd7: ALLIN ₮2.03
e13bc911: calls ₮1.50
*** TURN *** [8s Jh 7s] [Ks]
*** RIVER *** [8s Jh 7s Ks] [6h]
*** SHOWDOWN ***
e13bc911: shows [7h 7d] (Three Of A Kind)
e13bc911 collected ₮2.18 from pot
e13bc911: shows [7h 7d] (Three Of A Kind)
e13bc911 collected ₮2.75 from pot
861badd7: shows [Kh Jc] (Two Pair)
e2f79187: shows [Kd 8d] (Two Pair)
*** SUMMARY ***
Total pot ₮5.41 | Rake ₮0.20
Hand was run once
Board [ 8s Jh 7s Ks 6h ]
Game ended: 2026/06/08 01:27:13 CEST
Seat 1: f8298aec folded before Flop (didn't bet)
Seat 2: 861badd7 showed [Kh Jc] and lost with Two Pair
Seat 3: e2f79187 showed [Kd 8d] and lost with Two Pair
Seat 4: f66a7aef folded before Flop (didn't bet)
Seat 5: Hero folded on the Flop
Seat 6: e13bc911 showed [7h 7d] and won (₮2.18) with Three Of A Kind
```

#### Hand 6375710062 (RETURN, auto big blind)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710062: NLH (₮0.01/₮0.02) 2026/06/08 01:27:56 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: 470e449f (₮2 in chips)
Seat 2: 28aaa286 (₮1.94 in chips)
Seat 3: 63914a13 (₮2 in chips)
Seat 4: 006374a8 (₮2 in chips)
Seat 5: Hero (₮1.99 in chips)
Seat 6: 08aa94c6 (₮5.12 in chips)
08aa94c6: posts small blind ₮0.01
470e449f: posts big blind ₮0.02
63914a13: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to 470e449f
Dealt to 28aaa286
Dealt to 63914a13
Dealt to 006374a8
Dealt to Hero [6h 3d]
Dealt to 08aa94c6
28aaa286: raises ₮0.04 to ₮0.06
63914a13: folds
006374a8: folds
Hero: folds
08aa94c6: folds
470e449f: folds
28aaa286: RETURN ₮0.04
*** SHOWDOWN ***
28aaa286 collected ₮0.07 from pot
*** SUMMARY ***
Total pot ₮0.07 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:28:22 CEST
Seat 1: 470e449f folded before Flop (didn't bet)
Seat 2: 28aaa286 won (₮0.07)
Seat 3: 63914a13 folded before Flop (didn't bet)
Seat 4: 006374a8 folded before Flop (didn't bet)
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: 08aa94c6 folded before Flop (didn't bet)
```

#### Hand 6375710063 (RETURN)

Expected Hero result: -0.06; Current parser result: -0.06; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710063: NLH (₮0.01/₮0.02) 2026/06/08 01:28:27 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: a1eadd3c (₮2 in chips)
Seat 2: e203dbd6 (₮1.99 in chips)
Seat 3: d5d62b68 (₮1.98 in chips)
Seat 4: 704500ac (₮2 in chips)
Seat 5: Hero (₮1.99 in chips)
Seat 6: 7279cefa (₮5.11 in chips)
a1eadd3c: posts small blind ₮0.01
e203dbd6: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to a1eadd3c
Dealt to e203dbd6
Dealt to d5d62b68
Dealt to 704500ac
Dealt to Hero [6s 5s]
Dealt to 7279cefa
d5d62b68: calls ₮0.02
704500ac: folds
Hero: raises ₮0.04 to ₮0.06
7279cefa: calls ₮0.06
a1eadd3c: folds
e203dbd6: calls ₮0.04
d5d62b68: folds
*** FLOP *** [4h Ad Th]
e203dbd6: checks
Hero: checks
7279cefa: checks
*** TURN *** [4h Ad Th] [Qh]
e203dbd6: bets ₮0.07
Hero: folds
7279cefa: calls ₮0.07
*** RIVER *** [4h Ad Th Qh] [7s]
e203dbd6: checks
7279cefa: bets ₮0.35
e203dbd6: folds
7279cefa: RETURN ₮0.35
*** SHOWDOWN ***
7279cefa collected ₮0.33 from pot
*** SUMMARY ***
Total pot ₮0.35 | Rake ₮0.02
Hand was run once
Board [ 4h Ad Th Qh 7s ]
Game ended: 2026/06/08 01:29:29 CEST
Seat 1: a1eadd3c folded before Flop (didn't bet)
Seat 2: e203dbd6 folded on the River
Seat 3: d5d62b68 folded before Flop (didn't bet)
Seat 4: 704500ac folded before Flop (didn't bet)
Seat 5: Hero folded on the Turn
Seat 6: 7279cefa won (₮0.33)
```

#### Hand 6375710065 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710065: NLH (₮0.01/₮0.02) 2026/06/08 01:30:24 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: ebd3b654 (₮2 in chips)
Seat 2: 27130ea9 (₮1.85 in chips)
Seat 3: 1a926146 (₮2.03 in chips)
Seat 4: 34382af2 (₮2 in chips)
Seat 5: Hero (₮2 in chips)
Seat 6: bf6a4b98 (₮5.26 in chips)
1a926146: posts small blind ₮0.01
34382af2: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to ebd3b654
Dealt to 27130ea9
Dealt to 1a926146
Dealt to 34382af2
Dealt to Hero [6h 2h]
Dealt to bf6a4b98
Hero: folds
bf6a4b98: raises ₮0.02 to ₮0.04
ebd3b654: folds
27130ea9: raises ₮0.06 to ₮0.10
1a926146: folds
34382af2: folds
bf6a4b98: calls ₮0.06
*** FLOP *** [6d 6c Qh]
bf6a4b98: checks
27130ea9: bets ₮0.08
bf6a4b98: calls ₮0.08
*** TURN *** [6d 6c Qh] [Tc]
bf6a4b98: checks
27130ea9: bets ₮0.30
bf6a4b98: folds
27130ea9: RETURN ₮0.30
*** SHOWDOWN ***
27130ea9 collected ₮0.37 from pot
*** SUMMARY ***
Total pot ₮0.39 | Rake ₮0.02
Hand was run once
Board [ 6d 6c Qh Tc ]
Game ended: 2026/06/08 01:31:04 CEST
Seat 1: ebd3b654 folded before Flop (didn't bet)
Seat 2: 27130ea9 won (₮0.37)
Seat 3: 1a926146 folded before Flop (didn't bet)
Seat 4: 34382af2 folded before Flop (didn't bet)
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: bf6a4b98 folded on the Turn
```

#### Hand 6375710066 (RETURN)

Expected Hero result: -0.07; Current parser result: -0.07; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710066: NLH (₮0.01/₮0.02) 2026/06/08 01:31:09 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 7ee34bd0 (₮2 in chips)
Seat 2: 07b31d50 (₮2.04 in chips)
Seat 3: 1e35efbe (₮2.02 in chips)
Seat 4: 02a18be5 (₮2 in chips)
Seat 5: Hero (₮2 in chips)
Seat 6: 8334137b (₮5.08 in chips)
02a18be5: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 7ee34bd0
Dealt to 07b31d50
Dealt to 1e35efbe
Dealt to 02a18be5
Dealt to Hero [Ac 2s]
Dealt to 8334137b
8334137b: calls ₮0.02
7ee34bd0: folds
07b31d50: raises ₮0.05 to ₮0.07
1e35efbe: folds
02a18be5: folds
Hero: calls ₮0.05
8334137b: calls ₮0.05
*** FLOP *** [3d 4c 6d]
Hero: checks
8334137b: checks
07b31d50: bets ₮0.17
Hero: folds
8334137b: folds
07b31d50: RETURN ₮0.17
*** SHOWDOWN ***
07b31d50 collected ₮0.21 from pot
*** SUMMARY ***
Total pot ₮0.22 | Rake ₮0.01
Hand was run once
Board [ 3d 4c 6d ]
Game ended: 2026/06/08 01:31:49 CEST
Seat 1: 7ee34bd0 folded before Flop (didn't bet)
Seat 2: 07b31d50 won (₮0.21)
Seat 3: 1e35efbe folded before Flop (didn't bet)
Seat 4: 02a18be5 folded before Flop (didn't bet)
Seat 5: Hero folded on the Flop
Seat 6: 8334137b folded on the Flop
```

#### Hand 6375710067 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710067: NLH (₮0.01/₮0.02) 2026/06/08 01:31:54 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 2ba2c20a (₮2 in chips)
Seat 2: a7bc20ae (₮2.18 in chips)
Seat 3: 0f3812f9 (₮2.02 in chips)
Seat 4: b6665a98 (₮2 in chips)
Seat 5: Hero (₮1.93 in chips)
Seat 6: 72a56104 (₮5.01 in chips)
Hero: posts small blind ₮0.01
72a56104: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 2ba2c20a
Dealt to a7bc20ae
Dealt to 0f3812f9
Dealt to b6665a98
Dealt to Hero [Qh 8d]
Dealt to 72a56104
2ba2c20a: folds
a7bc20ae: raises ₮0.03 to ₮0.05
0f3812f9: raises ₮0.03 to ₮0.08
b6665a98: folds
Hero: folds
72a56104: calls ₮0.06
a7bc20ae: calls ₮0.03
*** FLOP *** [Ac Js 6s]
72a56104: checks
a7bc20ae: checks
0f3812f9: bets ₮0.12
72a56104: folds
a7bc20ae: calls ₮0.12
*** TURN *** [Ac Js 6s] [8s]
a7bc20ae: checks
0f3812f9: bets ₮0.24
a7bc20ae: folds
0f3812f9: RETURN ₮0.24
*** SHOWDOWN ***
0f3812f9 collected ₮0.47 from pot
*** SUMMARY ***
Total pot ₮0.49 | Rake ₮0.02
Hand was run once
Board [ Ac Js 6s 8s ]
Game ended: 2026/06/08 01:32:53 CEST
Seat 1: 2ba2c20a folded before Flop (didn't bet)
Seat 2: a7bc20ae folded on the Turn
Seat 3: 0f3812f9 won (₮0.47)
Seat 4: b6665a98 folded before Flop (didn't bet)
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: 72a56104 folded on the Flop
```

#### Hand 6353370691 (RETURN)

Expected Hero result: -0.07; Current parser result: -0.07; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370691: NLH (₮0.01/₮0.02) 2026/06/08 01:34:14 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: d4f297d5 (₮2.27 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: e4122835 (₮2.22 in chips)
Seat 6: 40353184 (₮2.46 in chips)
d4f297d5: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to d4f297d5
Dealt to Hero [Ah 5s]
Dealt to e4122835
Dealt to 40353184
e4122835: folds
40353184: raises ₮0.02 to ₮0.04
d4f297d5: folds
Hero: calls ₮0.02
*** FLOP *** [8s 5d 8d]
Hero: bets ₮0.03
40353184: calls ₮0.03
*** TURN *** [8s 5d 8d] [Qc]
Hero: checks
40353184: bets ₮0.05
Hero: folds
40353184: RETURN ₮0.05
*** SHOWDOWN ***
40353184 collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0.01
Hand was run once
Board [ 8s 5d 8d Qc ]
Game ended: 2026/06/08 01:34:40 CEST
Seat 1: d4f297d5 folded before Flop (didn't bet)
Seat 3: Hero folded on the Turn
Seat 4: e4122835 folded before Flop (didn't bet)
Seat 6: 40353184 won (₮0.14)
```

#### Hand 6375710069 (RETURN, ALLIN)

Expected Hero result: 1.76; Current parser result: 1.76; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710069: NLH (₮0.01/₮0.02) 2026/06/08 01:34:29 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: 1d0ba0f7 (₮2 in chips)
Seat 3: 0674321f (₮1.89 in chips)
Seat 4: e75f88af (₮2 in chips)
Seat 5: Hero (₮1.92 in chips)
Seat 6: 23858c02 (₮5.39 in chips)
1d0ba0f7: posts small blind ₮0.01
0674321f: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 1d0ba0f7
Dealt to 0674321f
Dealt to e75f88af
Dealt to Hero [Qh Jh]
Dealt to 23858c02
e75f88af: folds
Hero: raises ₮0.03 to ₮0.05
23858c02: calls ₮0.05
1d0ba0f7: folds
0674321f: calls ₮0.03
*** FLOP *** [Ac Jd Jc]
0674321f: bets ₮0.08
Hero: calls ₮0.08
23858c02: folds
*** TURN *** [Ac Jd Jc] [4h]
0674321f: bets ₮0.32
Hero: calls ₮0.32
*** RIVER *** [Ac Jd Jc 4h] [7c]
0674321f: bets ₮0.72
Hero: ALLIN ₮1.47
0674321f: ALLIN ₮0.72
Hero: RETURN ₮0.03
*** SHOWDOWN ***
Hero: shows [Qh Jh] (Three Of A Kind)
Hero collected ₮3.65 from pot
0674321f: shows [As 6d] (Two Pair)
*** SUMMARY ***
Total pot ₮3.84 | Rake ₮0.19
Hand was run once
Board [ Ac Jd Jc 4h 7c ]
Game ended: 2026/06/08 01:35:34 CEST
Seat 1: 1d0ba0f7 folded before Flop (didn't bet)
Seat 3: 0674321f showed [As 6d] and lost with Two Pair
Seat 4: e75f88af folded before Flop (didn't bet)
Seat 5: Hero showed [Qh Jh] and won (₮3.65) with Three Of A Kind
Seat 6: 23858c02 folded on the Flop
```

#### Hand 6353370692 (RETURN)

Expected Hero result: 0.02; Current parser result: 0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370692: NLH (₮0.01/₮0.02) 2026/06/08 01:34:45 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: f11e8633 (₮2.26 in chips)
Seat 3: Hero (₮1.93 in chips)
Seat 4: 56af0384 (₮2.22 in chips)
Seat 6: a74889c1 (₮2.53 in chips)
Hero: posts small blind ₮0.01
56af0384: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to f11e8633
Dealt to Hero [Kc Qd]
Dealt to 56af0384
Dealt to a74889c1
a74889c1: folds
f11e8633: folds
Hero: raises ₮0.03 to ₮0.05
56af0384: folds
Hero: RETURN ₮0.03
*** SHOWDOWN ***
Hero collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:35:06 CEST
Seat 1: f11e8633 folded before Flop (didn't bet)
Seat 3: Hero showed [Kc Qd] and won (₮0.04)
Seat 4: 56af0384 folded before Flop (didn't bet)
Seat 6: a74889c1 folded before Flop (didn't bet)
```

#### Hand 6353370693 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370693: NLH (₮0.01/₮0.02) 2026/06/08 01:35:11 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 2ad266b5 (₮2.26 in chips)
Seat 3: Hero (₮1.95 in chips)
Seat 4: a5ac8219 (₮2.20 in chips)
Seat 6: 4b4a7a82 (₮2.53 in chips)
a5ac8219: posts small blind ₮0.01
4b4a7a82: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 2ad266b5
Dealt to Hero [6s 3s]
Dealt to a5ac8219
Dealt to 4b4a7a82
2ad266b5: folds
Hero: folds
a5ac8219: raises ₮0.04 to ₮0.06
4b4a7a82: calls ₮0.04
*** FLOP *** [9h 6d Kd]
a5ac8219: bets ₮0.06
4b4a7a82: calls ₮0.06
*** TURN *** [9h 6d Kd] [Qc]
a5ac8219: checks
4b4a7a82: bets ₮0.18
a5ac8219: folds
4b4a7a82: RETURN ₮0.18
*** SHOWDOWN ***
4b4a7a82 collected ₮0.23 from pot
*** SUMMARY ***
Total pot ₮0.24 | Rake ₮0.01
Hand was run once
Board [ 9h 6d Kd Qc ]
Game ended: 2026/06/08 01:36:19 CEST
Seat 1: 2ad266b5 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: a5ac8219 folded on the Turn
Seat 6: 4b4a7a82 won (₮0.23)
```

#### Hand 6375710070 (RETURN)

Expected Hero result: -0.04; Current parser result: -0.04; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710070: NLH (₮0.01/₮0.02) 2026/06/08 01:35:40 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: b07c4889 (₮2 in chips)
Seat 4: a9cf4b09 (₮2 in chips)
Seat 5: Hero (₮3.68 in chips)
Seat 6: 5ca7a0a8 (₮5.34 in chips)
a9cf4b09: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to b07c4889
Dealt to a9cf4b09
Dealt to Hero [Jc 9s]
Dealt to 5ca7a0a8
5ca7a0a8: calls ₮0.02
b07c4889: folds
a9cf4b09: folds
Hero: checks
*** FLOP *** [3h 9d 3d]
Hero: bets ₮0.02
5ca7a0a8: calls ₮0.02
*** TURN *** [3h 9d 3d] [Qd]
Hero: checks
5ca7a0a8: bets ₮0.09
Hero: folds
5ca7a0a8: RETURN ₮0.09
*** SHOWDOWN ***
5ca7a0a8 collected ₮0.09 from pot
*** SUMMARY ***
Total pot ₮0.09 | Rake ₮0
Hand was run once
Board [ 3h 9d 3d Qd ]
Game ended: 2026/06/08 01:36:08 CEST
Seat 1: b07c4889 folded before Flop (didn't bet)
Seat 4: a9cf4b09 folded before Flop (didn't bet)
Seat 5: Hero folded on the Turn
Seat 6: 5ca7a0a8 won (₮0.09)
```

#### Hand 6375710071 (RETURN, auto big blind)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710071: NLH (₮0.01/₮0.02) 2026/06/08 01:36:13 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: b4acef01 (₮2 in chips)
Seat 3: 77b7bf00 (₮2 in chips)
Seat 4: 69507fb9 (₮2 in chips)
Seat 5: Hero (₮3.64 in chips)
Seat 6: dfae3b55 (₮5.39 in chips)
Hero: posts small blind ₮0.01
dfae3b55: posts big blind ₮0.02
77b7bf00: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to b4acef01
Dealt to 77b7bf00
Dealt to 69507fb9
Dealt to Hero [Jc 5h]
Dealt to dfae3b55
b4acef01: raises ₮0.04 to ₮0.06
77b7bf00: folds
69507fb9: folds
Hero: folds
dfae3b55: calls ₮0.04
*** FLOP *** [9s Tc Ts]
dfae3b55: bets ₮0.02
b4acef01: calls ₮0.02
*** TURN *** [9s Tc Ts] [7h]
dfae3b55: checks
b4acef01: bets ₮0.14
dfae3b55: calls ₮0.14
*** RIVER *** [9s Tc Ts 7h] [Qh]
dfae3b55: checks
b4acef01: bets ₮0.35
dfae3b55: folds
b4acef01: RETURN ₮0.35
*** SHOWDOWN ***
b4acef01 collected ₮0.45 from pot
*** SUMMARY ***
Total pot ₮0.47 | Rake ₮0.02
Hand was run once
Board [ 9s Tc Ts 7h Qh ]
Game ended: 2026/06/08 01:36:44 CEST
Seat 1: b4acef01 won (₮0.45)
Seat 3: 77b7bf00 folded before Flop (didn't bet)
Seat 4: 69507fb9 folded before Flop (didn't bet)
Seat 5: Hero folded before Flop (didn't bet)
Seat 6: dfae3b55 folded on the River
```

#### Hand 6353370694 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370694: NLH (₮0.01/₮0.02) 2026/06/08 01:36:24 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 13c1e4e1 (₮2.26 in chips)
Seat 3: Hero (₮1.95 in chips)
Seat 4: 2ebb70ac (₮2.08 in chips)
Seat 6: 4c41f3cc (₮2.64 in chips)
4c41f3cc: posts small blind ₮0.01
13c1e4e1: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 13c1e4e1
Dealt to Hero [Js 5c]
Dealt to 2ebb70ac
Dealt to 4c41f3cc
Hero: folds
2ebb70ac: folds
4c41f3cc: folds
13c1e4e1: RETURN ₮0.01
*** SHOWDOWN ***
13c1e4e1 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:36:33 CEST
Seat 1: 13c1e4e1 won (₮0.02)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 2ebb70ac folded before Flop (didn't bet)
Seat 6: 4c41f3cc folded before Flop (didn't bet)
```

#### Hand 6353370695 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370695: NLH (₮0.01/₮0.02) 2026/06/08 01:36:38 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: 4777ff18 (₮2.27 in chips)
Seat 2: 461e0a18 (₮2 in chips)
Seat 3: Hero (₮1.95 in chips)
Seat 4: c1545e63 (₮2.08 in chips)
Seat 6: 4f54b122 (₮2.63 in chips)
4777ff18: posts small blind ₮0.01
461e0a18: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 4777ff18
Dealt to 461e0a18
Dealt to Hero [As Tc]
Dealt to c1545e63
Dealt to 4f54b122
Hero: folds
c1545e63: folds
4f54b122: folds
4777ff18: folds
461e0a18: RETURN ₮0.01
*** SHOWDOWN ***
461e0a18 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:36:53 CEST
Seat 1: 4777ff18 folded before Flop (didn't bet)
Seat 2: 461e0a18 won (₮0.02)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: c1545e63 folded before Flop (didn't bet)
Seat 6: 4f54b122 folded before Flop (didn't bet)
```

#### Hand 6375710072 (RETURN)

Expected Hero result: -0.11; Current parser result: -0.11; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710072: NLH (₮0.01/₮0.02) 2026/06/08 01:36:49 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: 0bc8f48d (₮2.23 in chips)
Seat 3: e806e2c7 (₮1.98 in chips)
Seat 4: 41404916 (₮2 in chips)
Seat 5: Hero (₮3.63 in chips)
Seat 6: 9864f9db (₮5.17 in chips)
9864f9db: posts small blind ₮0.01
0bc8f48d: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 0bc8f48d
Dealt to e806e2c7
Dealt to 41404916
Dealt to Hero [5s 3s]
Dealt to 9864f9db
e806e2c7: folds
41404916: folds
Hero: raises ₮0.03 to ₮0.05
9864f9db: calls ₮0.04
0bc8f48d: folds
*** FLOP *** [Kd Ah As]
9864f9db: checks
Hero: bets ₮0.06
9864f9db: calls ₮0.06
*** TURN *** [Kd Ah As] [9d]
9864f9db: checks
Hero: checks
*** RIVER *** [Kd Ah As 9d] [4d]
9864f9db: bets ₮0.08
Hero: folds
9864f9db: RETURN ₮0.08
*** SHOWDOWN ***
9864f9db collected ₮0.23 from pot
*** SUMMARY ***
Total pot ₮0.24 | Rake ₮0.01
Hand was run once
Board [ Kd Ah As 9d 4d ]
Game ended: 2026/06/08 01:37:32 CEST
Seat 1: 0bc8f48d folded before Flop (didn't bet)
Seat 3: e806e2c7 folded before Flop (didn't bet)
Seat 4: 41404916 folded before Flop (didn't bet)
Seat 5: Hero folded on the River
Seat 6: 9864f9db won (₮0.23)
```

#### Hand 6353370696 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370696: NLH (₮0.01/₮0.02) 2026/06/08 01:36:58 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: efafb044 (₮2.26 in chips)
Seat 2: 39cc554e (₮2.01 in chips)
Seat 3: Hero (₮1.95 in chips)
Seat 4: ff37d393 (₮2.08 in chips)
Seat 6: 523ca7b1 (₮2.63 in chips)
39cc554e: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to efafb044
Dealt to 39cc554e
Dealt to Hero [Qh 7s]
Dealt to ff37d393
Dealt to 523ca7b1
ff37d393: folds
523ca7b1: raises ₮0.02 to ₮0.04
efafb044: folds
39cc554e: folds
Hero: folds
523ca7b1: RETURN ₮0.02
*** SHOWDOWN ***
523ca7b1 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:37:28 CEST
Seat 1: efafb044 folded before Flop (didn't bet)
Seat 2: 39cc554e folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: ff37d393 folded before Flop (didn't bet)
Seat 6: 523ca7b1 won (₮0.05)
```

#### Hand 6343041011 (ALLIN)

Expected Hero result: -0.10; Current parser result: -0.10; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041011: NLH (₮0.01/₮0.02) 2026/06/08 01:37:28 CEST
Table '200588' 6-max Seat #4 is the button
Seat 3: ceeda10c (₮2.86 in chips)
Seat 1: 1c4634e4 (₮1.62 in chips)
Seat 2: 50cd4936 (₮4.86 in chips)
Seat 4: a84d4f85 (₮1.60 in chips)
Seat 5: c653584a (₮0.85 in chips)
Seat 6: Hero (₮2 in chips)
c653584a: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to ceeda10c
Dealt to 1c4634e4
Dealt to 50cd4936
Dealt to a84d4f85
Dealt to c653584a
Dealt to Hero [4h 3h]
1c4634e4: folds
50cd4936: folds
ceeda10c: raises ₮0.02 to ₮0.04
a84d4f85: calls ₮0.04
c653584a: raises ₮0.06 to ₮0.10
Hero: calls ₮0.08
ceeda10c: calls ₮0.06
a84d4f85: calls ₮0.06
*** FLOP *** [Ts 7c 7d]
c653584a: ALLIN ₮0.75
Hero: folds
ceeda10c: calls ₮0.75
a84d4f85: folds
*** TURN *** [Ts 7c 7d] [Th]
*** RIVER *** [Ts 7c 7d Th] [Td]
*** SHOWDOWN ***
c653584a: shows [Ks Kc] (Full House)
c653584a collected ₮1.22 from pot
ceeda10c: shows [9h 8h] (Full House)
*** SUMMARY ***
Total pot ₮1.90 | Rake ₮0.10
Hand was run once
Board [ Ts 7c 7d Th Td ]
Game ended: 2026/06/08 01:38:43 CEST
Seat 3: ceeda10c showed [9h 8h] and lost with Full House
Seat 1: 1c4634e4 folded before Flop (didn't bet)
Seat 2: 50cd4936 folded before Flop (didn't bet)
Seat 4: a84d4f85 folded on the Flop
Seat 5: c653584a showed [Ks Kc] and won (₮1.22) with Full House
Seat 6: Hero folded on the Flop
```

#### Hand 6353370697 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370697: NLH (₮0.01/₮0.02) 2026/06/08 01:37:33 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 22c23d7c (₮2.26 in chips)
Seat 2: 2b79ad66 (₮2 in chips)
Seat 3: Hero (₮1.93 in chips)
Seat 4: e32ff986 (₮2.08 in chips)
Seat 6: e2adbb5d (₮2.66 in chips)
Hero: posts small blind ₮0.01
e32ff986: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 22c23d7c
Dealt to 2b79ad66
Dealt to Hero [7h 2h]
Dealt to e32ff986
Dealt to e2adbb5d
e2adbb5d: folds
22c23d7c: folds
2b79ad66: folds
Hero: calls ₮0.01
e32ff986: raises ₮0.09 to ₮0.11
Hero: folds
e32ff986: RETURN ₮0.09
*** SHOWDOWN ***
e32ff986 collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:37:59 CEST
Seat 1: 22c23d7c folded before Flop (didn't bet)
Seat 2: 2b79ad66 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: e32ff986 won (₮0.04)
Seat 6: e2adbb5d folded before Flop (didn't bet)
```

#### Hand 6375710073 (RETURN, ALLIN)

Expected Hero result: -0.73; Current parser result: -0.73; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710073: NLH (₮0.01/₮0.02) 2026/06/08 01:37:37 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: f6fd585c (₮2.21 in chips)
Seat 2: 4acf230b (₮2 in chips)
Seat 3: 7cf4e745 (₮1.98 in chips)
Seat 4: 20c076d6 (₮2 in chips)
Seat 5: Hero (₮3.52 in chips)
Seat 6: 1af73973 (₮5.29 in chips)
f6fd585c: posts small blind ₮0.01
4acf230b: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to f6fd585c
Dealt to 4acf230b
Dealt to 7cf4e745
Dealt to 20c076d6
Dealt to Hero [Kd Td]
Dealt to 1af73973
7cf4e745: folds
20c076d6: calls ₮0.02
Hero: raises ₮0.05 to ₮0.07
1af73973: folds
f6fd585c: calls ₮0.06
4acf230b: calls ₮0.05
20c076d6: calls ₮0.05
*** FLOP *** [Ts 3h As]
f6fd585c: checks
4acf230b: checks
20c076d6: checks
Hero: bets ₮0.14
f6fd585c: folds
4acf230b: calls ₮0.14
20c076d6: calls ₮0.14
*** TURN *** [Ts 3h As] [Qh]
4acf230b: checks
20c076d6: checks
Hero: bets ₮0.52
4acf230b: calls ₮0.52
20c076d6: calls ₮0.52
*** RIVER *** [Ts 3h As Qh] [5h]
4acf230b: ALLIN ₮1.27
20c076d6: folds
Hero: folds
4acf230b: RETURN ₮1.27
*** SHOWDOWN ***
4acf230b collected ₮2.15 from pot
*** SUMMARY ***
Total pot ₮2.26 | Rake ₮0.11
Hand was run once
Board [ Ts 3h As Qh 5h ]
Game ended: 2026/06/08 01:39:06 CEST
Seat 1: f6fd585c folded on the Flop
Seat 2: 4acf230b won (₮2.15)
Seat 3: 7cf4e745 folded before Flop (didn't bet)
Seat 4: 20c076d6 folded on the River
Seat 5: Hero folded on the River
Seat 6: 1af73973 folded before Flop (didn't bet)
```

#### Hand 6353370698 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370698: NLH (₮0.01/₮0.02) 2026/06/08 01:38:05 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: bead2999 (₮2.26 in chips)
Seat 2: beb35fdf (₮2 in chips)
Seat 3: Hero (₮1.91 in chips)
Seat 4: 6cddf1b7 (₮2.10 in chips)
Seat 5: 9c29d20b (₮2 in chips)
Seat 6: 4741b4a8 (₮2.66 in chips)
6cddf1b7: posts small blind ₮0.01
9c29d20b: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to bead2999
Dealt to beb35fdf
Dealt to Hero [8c 4c]
Dealt to 6cddf1b7
Dealt to 9c29d20b
Dealt to 4741b4a8
4741b4a8: raises ₮0.02 to ₮0.04
bead2999: folds
beb35fdf: folds
Hero: folds
6cddf1b7: raises ₮0.13 to ₮0.17
9c29d20b: folds
4741b4a8: folds
6cddf1b7: RETURN ₮0.13
*** SHOWDOWN ***
6cddf1b7 collected ₮0.10 from pot
*** SUMMARY ***
Total pot ₮0.10 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:38:40 CEST
Seat 1: bead2999 folded before Flop (didn't bet)
Seat 2: beb35fdf folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 6cddf1b7 won (₮0.10)
Seat 5: 9c29d20b folded before Flop (didn't bet)
Seat 6: 4741b4a8 folded before Flop (didn't bet)
```

#### Hand 6353370699 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370699: NLH (₮0.01/₮0.02) 2026/06/08 01:38:45 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: b3e720ec (₮2.26 in chips)
Seat 2: b313e0f5 (₮2 in chips)
Seat 3: Hero (₮1.91 in chips)
Seat 4: ff5c9f79 (₮2.16 in chips)
Seat 5: 9eb3e8cc (₮1.98 in chips)
Seat 6: e7ce899a (₮2.62 in chips)
9eb3e8cc: posts small blind ₮0.01
e7ce899a: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to b3e720ec
Dealt to b313e0f5
Dealt to Hero [7c 2h]
Dealt to ff5c9f79
Dealt to 9eb3e8cc
Dealt to e7ce899a
b3e720ec: folds
b313e0f5: folds
Hero: folds
ff5c9f79: folds
9eb3e8cc: folds
e7ce899a: RETURN ₮0.01
*** SHOWDOWN ***
e7ce899a collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:38:54 CEST
Seat 1: b3e720ec folded before Flop (didn't bet)
Seat 2: b313e0f5 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: ff5c9f79 folded before Flop (didn't bet)
Seat 5: 9eb3e8cc folded before Flop (didn't bet)
Seat 6: e7ce899a won (₮0.02)
```

#### Hand 6353370700 (RETURN)

Expected Hero result: 0.09; Current parser result: 0.09; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370700: NLH (₮0.01/₮0.02) 2026/06/08 01:38:59 CEST
Table '200588' 6-max Seat #5 is the button
Seat 6: 02bf46cd (₮2.63 in chips)
Seat 1: e43af418 (₮2.26 in chips)
Seat 2: f1eea63a (₮2 in chips)
Seat 3: Hero (₮1.91 in chips)
Seat 4: 1287db43 (₮2.16 in chips)
Seat 5: b9eccde2 (₮1.97 in chips)
02bf46cd: posts small blind ₮0.01
e43af418: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 02bf46cd
Dealt to e43af418
Dealt to f1eea63a
Dealt to Hero [Jc Tc]
Dealt to 1287db43
Dealt to b9eccde2
f1eea63a: folds
Hero: raises ₮0.03 to ₮0.05
1287db43: folds
b9eccde2: folds
02bf46cd: folds
e43af418: calls ₮0.03
*** FLOP *** [Td 8h Qc]
e43af418: checks
Hero: bets ₮0.04
e43af418: calls ₮0.04
*** TURN *** [Td 8h Qc] [Ac]
e43af418: checks
Hero: checks
*** RIVER *** [Td 8h Qc Ac] [8c]
e43af418: checks
Hero: bets ₮0.06
e43af418: folds
Hero: RETURN ₮0.06
*** SHOWDOWN ***
Hero collected ₮0.18 from pot
*** SUMMARY ***
Total pot ₮0.19 | Rake ₮0.01
Hand was run once
Board [ Td 8h Qc Ac 8c ]
Game ended: 2026/06/08 01:40:12 CEST
Seat 6: 02bf46cd folded before Flop (didn't bet)
Seat 1: e43af418 folded on the River
Seat 2: f1eea63a folded before Flop (didn't bet)
Seat 3: Hero showed [Jc Tc] and won (₮0.18)
Seat 4: 1287db43 folded before Flop (didn't bet)
Seat 5: b9eccde2 folded before Flop (didn't bet)
```

#### Hand 6343041013 (RETURN, ALLIN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041013: NLH (₮0.01/₮0.02) 2026/06/08 01:39:57 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: f51d0f40 (₮1.60 in chips)
Seat 2: 9773d868 (₮4.86 in chips)
Seat 4: e0d4fe18 (₮1 in chips)
Seat 5: f7eff14d (₮1.70 in chips)
Seat 6: Hero (₮1.89 in chips)
f51d0f40: posts small blind ₮0.01
9773d868: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to f51d0f40
Dealt to 9773d868
Dealt to e0d4fe18
Dealt to f7eff14d
Dealt to Hero [Kh 3s]
e0d4fe18: raises ₮0.02 to ₮0.04
f7eff14d: calls ₮0.04
Hero: folds
f51d0f40: calls ₮0.03
9773d868: folds
*** FLOP *** [7d Jd 8d]
f51d0f40: checks
e0d4fe18: ALLIN ₮0.96
f7eff14d: folds
f51d0f40: folds
e0d4fe18: RETURN ₮0.96
*** SHOWDOWN ***
e0d4fe18 collected ₮0.13 from pot
*** SUMMARY ***
Total pot ₮0.14 | Rake ₮0.01
Hand was run once
Board [ 7d Jd 8d ]
Game ended: 2026/06/08 01:40:36 CEST
Seat 1: f51d0f40 folded on the Flop
Seat 2: 9773d868 folded before Flop (didn't bet)
Seat 4: e0d4fe18 won (₮0.13)
Seat 5: f7eff14d folded on the Flop
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6375710075 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710075: NLH (₮0.01/₮0.02) 2026/06/08 01:40:06 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 78af3053 (₮3.11 in chips)
Seat 2: 98ac9f82 (₮3.41 in chips)
Seat 3: 3dc0ca56 (₮1.74 in chips)
Seat 4: 0fb7aae8 (₮2 in chips)
Seat 5: Hero (₮2.79 in chips)
3dc0ca56: posts small blind ₮0.01
0fb7aae8: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 78af3053
Dealt to 98ac9f82
Dealt to 3dc0ca56
Dealt to 0fb7aae8
Dealt to Hero [Js 2c]
Hero: folds
78af3053: folds
98ac9f82: folds
3dc0ca56: folds
0fb7aae8: RETURN ₮0.01
*** SHOWDOWN ***
0fb7aae8 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:41:01 CEST
Seat 1: 78af3053 folded before Flop (didn't bet)
Seat 2: 98ac9f82 folded before Flop (didn't bet)
Seat 3: 3dc0ca56 folded before Flop (didn't bet)
Seat 4: 0fb7aae8 won (₮0.02)
Seat 5: Hero folded before Flop (didn't bet)
```

#### Hand 6353370701 (RETURN)

Expected Hero result: -0.12; Current parser result: -0.12; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370701: NLH (₮0.01/₮0.02) 2026/06/08 01:40:17 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 27c348d2 (₮2.17 in chips)
Seat 2: f086a1bc (₮2 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: f5ab083a (₮2.16 in chips)
Seat 5: 787af928 (₮1.97 in chips)
f086a1bc: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 27c348d2
Dealt to f086a1bc
Dealt to Hero [8s 8h]
Dealt to f5ab083a
Dealt to 787af928
f5ab083a: folds
787af928: raises ₮0.02 to ₮0.04
27c348d2: folds
f086a1bc: folds
Hero: calls ₮0.02
*** FLOP *** [2c Jh 3s]
Hero: bets ₮0.03
787af928: calls ₮0.03
*** TURN *** [2c Jh 3s] [3h]
Hero: bets ₮0.05
787af928: calls ₮0.05
*** RIVER *** [2c Jh 3s 3h] [4h]
Hero: checks
787af928: bets ₮0.23
Hero: folds
787af928: RETURN ₮0.23
*** SHOWDOWN ***
787af928 collected ₮0.24 from pot
*** SUMMARY ***
Total pot ₮0.25 | Rake ₮0.01
Hand was run once
Board [ 2c Jh 3s 3h 4h ]
Game ended: 2026/06/08 01:41:15 CEST
Seat 1: 27c348d2 folded before Flop (didn't bet)
Seat 2: f086a1bc folded before Flop (didn't bet)
Seat 3: Hero folded on the River
Seat 4: f5ab083a folded before Flop (didn't bet)
Seat 5: 787af928 won (₮0.24)
```

#### Hand 6343041014 (RETURN)

Expected Hero result: 0.09; Current parser result: 0.09; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041014: NLH (₮0.01/₮0.02) 2026/06/08 01:40:41 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 1ffcc942 (₮1.56 in chips)
Seat 2: 37f1e79a (₮4.84 in chips)
Seat 4: e05f67e9 (₮1.09 in chips)
Seat 5: 6197a60a (₮1.66 in chips)
Seat 6: Hero (₮2 in chips)
37f1e79a: posts small blind ₮0.01
e05f67e9: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 1ffcc942
Dealt to 37f1e79a
Dealt to e05f67e9
Dealt to 6197a60a
Dealt to Hero [6c 5c]
6197a60a: calls ₮0.02
Hero: raises ₮0.05 to ₮0.07
1ffcc942: folds
37f1e79a: folds
e05f67e9: folds
6197a60a: calls ₮0.05
*** FLOP *** [2h 3c Ac]
6197a60a: checks
Hero: bets ₮0.06
6197a60a: folds
Hero: RETURN ₮0.06
*** SHOWDOWN ***
Hero collected ₮0.16 from pot
*** SUMMARY ***
Total pot ₮0.17 | Rake ₮0.01
Hand was run once
Board [ 2h 3c Ac ]
Game ended: 2026/06/08 01:41:34 CEST
Seat 1: 1ffcc942 folded before Flop (didn't bet)
Seat 2: 37f1e79a folded before Flop (didn't bet)
Seat 4: e05f67e9 folded before Flop (didn't bet)
Seat 5: 6197a60a folded on the Flop
Seat 6: Hero showed [6c 5c] and won (₮0.16)
```

#### Hand 6375710076 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710076: NLH (₮0.01/₮0.02) 2026/06/08 01:41:06 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 94bf7e57 (₮3.11 in chips)
Seat 2: 1a4ba88c (₮3.41 in chips)
Seat 3: 033f5c70 (₮1.73 in chips)
Seat 4: 7dd205d1 (₮2.01 in chips)
Seat 5: Hero (₮2.79 in chips)
7dd205d1: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 94bf7e57
Dealt to 1a4ba88c
Dealt to 033f5c70
Dealt to 7dd205d1
Dealt to Hero [5d 4s]
94bf7e57: folds
1a4ba88c: folds
033f5c70: calls ₮0.02
7dd205d1: folds
Hero: checks
*** FLOP *** [Jd 5c 9h]
Hero: checks
033f5c70: checks
*** TURN *** [Jd 5c 9h] [7d]
Hero: checks
033f5c70: checks
*** RIVER *** [Jd 5c 9h 7d] [9d]
Hero: checks
033f5c70: bets ₮0.05
Hero: folds
033f5c70: RETURN ₮0.05
*** SHOWDOWN ***
033f5c70 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [ Jd 5c 9h 7d 9d ]
Game ended: 2026/06/08 01:41:46 CEST
Seat 1: 94bf7e57 folded before Flop (didn't bet)
Seat 2: 1a4ba88c folded before Flop (didn't bet)
Seat 3: 033f5c70 won (₮0.05)
Seat 4: 7dd205d1 folded before Flop (didn't bet)
Seat 5: Hero folded on the River
```

#### Hand 6353370702 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370702: NLH (₮0.01/₮0.02) 2026/06/08 01:41:20 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 4d4c954d (₮2.17 in chips)
Seat 2: 90d93001 (₮2 in chips)
Seat 3: Hero (₮1.88 in chips)
Seat 4: 9d8e16fd (₮2.16 in chips)
Seat 5: d757389d (₮2.09 in chips)
Hero: posts small blind ₮0.01
9d8e16fd: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 4d4c954d
Dealt to 90d93001
Dealt to Hero [Jh 6h]
Dealt to 9d8e16fd
Dealt to d757389d
d757389d: folds
4d4c954d: folds
90d93001: folds
Hero: folds
9d8e16fd: RETURN ₮0.01
*** SHOWDOWN ***
9d8e16fd collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:41:49 CEST
Seat 1: 4d4c954d folded before Flop (didn't bet)
Seat 2: 90d93001 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 9d8e16fd won (₮0.02)
Seat 5: d757389d folded before Flop (didn't bet)
```

#### Hand 6343041015 (RETURN, ALLIN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041015: NLH (₮0.01/₮0.02) 2026/06/08 01:41:39 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 4f5d3460 (₮1.56 in chips)
Seat 2: 6418b0e1 (₮4.83 in chips)
Seat 4: 3e35b0c6 (₮1.07 in chips)
Seat 5: ee7c1ee9 (₮1.59 in chips)
Seat 6: Hero (₮2.09 in chips)
3e35b0c6: posts small blind ₮0.01
ee7c1ee9: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 4f5d3460
Dealt to 6418b0e1
Dealt to 3e35b0c6
Dealt to ee7c1ee9
Dealt to Hero [9h 3c]
Hero: folds
4f5d3460: raises ₮0.03 to ₮0.05
6418b0e1: folds
3e35b0c6: raises ₮0.09 to ₮0.14
ee7c1ee9: folds
4f5d3460: ALLIN ₮1.51
3e35b0c6: ALLIN ₮0.93
4f5d3460: RETURN ₮0.49
*** FLOP *** [2h 6h Qs]
*** TURN *** [2h 6h Qs] [2s]
*** RIVER *** [2h 6h Qs 2s] [Qh]
*** SHOWDOWN ***
4f5d3460: shows [Ac Kh] (Two Pair)
4f5d3460 collected ₮1.02 from pot
3e35b0c6: shows [As Kd] (Two Pair)
3e35b0c6 collected ₮1.03 from pot
*** SUMMARY ***
Total pot ₮2.16 | Rake ₮0.11
Hand was run once
Board [ 2h 6h Qs 2s Qh ]
Game ended: 2026/06/08 01:42:27 CEST
Seat 1: 4f5d3460 showed [Ac Kh] and won (₮1.02) with Two Pair
Seat 2: 6418b0e1 folded before Flop (didn't bet)
Seat 4: 3e35b0c6 showed [As Kd] and won (₮1.03) with Two Pair
Seat 5: ee7c1ee9 folded before Flop (didn't bet)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6375710077 (RETURN)

Expected Hero result: 0.05; Current parser result: 0.05; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710077: NLH (₮0.01/₮0.02) 2026/06/08 01:41:51 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 72ca1a26 (₮3.11 in chips)
Seat 2: 9376a383 (₮3.41 in chips)
Seat 3: e672f4e4 (₮1.76 in chips)
Seat 4: 7ba3d20f (₮2 in chips)
Seat 5: Hero (₮2.77 in chips)
Hero: posts small blind ₮0.01
72ca1a26: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 72ca1a26
Dealt to 9376a383
Dealt to e672f4e4
Dealt to 7ba3d20f
Dealt to Hero [Th 5h]
9376a383: folds
e672f4e4: folds
7ba3d20f: folds
Hero: calls ₮0.01
72ca1a26: raises ₮0.04 to ₮0.06
Hero: calls ₮0.04
*** FLOP *** [4d Qc 2c]
Hero: checks
72ca1a26: checks
*** TURN *** [4d Qc 2c] [5c]
Hero: checks
72ca1a26: checks
*** RIVER *** [4d Qc 2c 5c] [4h]
Hero: bets ₮0.09
72ca1a26: folds
Hero: RETURN ₮0.09
*** SHOWDOWN ***
Hero collected ₮0.11 from pot
*** SUMMARY ***
Total pot ₮0.12 | Rake ₮0.01
Hand was run once
Board [ 4d Qc 2c 5c 4h ]
Game ended: 2026/06/08 01:42:34 CEST
Seat 1: 72ca1a26 folded on the River
Seat 2: 9376a383 folded before Flop (didn't bet)
Seat 3: e672f4e4 folded before Flop (didn't bet)
Seat 4: 7ba3d20f folded before Flop (didn't bet)
Seat 5: Hero showed [Th 5h] and won (₮0.11)
```

#### Hand 6353370703 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370703: NLH (₮0.01/₮0.02) 2026/06/08 01:41:54 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 9babe122 (₮2.17 in chips)
Seat 2: 9c3ab8d8 (₮2 in chips)
Seat 3: Hero (₮1.87 in chips)
Seat 4: c1600b40 (₮2.17 in chips)
Seat 5: 1a076b7d (₮2.09 in chips)
c1600b40: posts small blind ₮0.01
1a076b7d: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 9babe122
Dealt to 9c3ab8d8
Dealt to Hero [8s 4c]
Dealt to c1600b40
Dealt to 1a076b7d
9babe122: folds
9c3ab8d8: folds
Hero: folds
c1600b40: folds
1a076b7d: RETURN ₮0.01
*** SHOWDOWN ***
1a076b7d collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:42:02 CEST
Seat 1: 9babe122 folded before Flop (didn't bet)
Seat 2: 9c3ab8d8 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: c1600b40 folded before Flop (didn't bet)
Seat 5: 1a076b7d won (₮0.02)
```

#### Hand 6353370704 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370704: NLH (₮0.01/₮0.02) 2026/06/08 01:42:06 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 5e676256 (₮2.17 in chips)
Seat 2: 1dc92cc9 (₮2 in chips)
Seat 3: Hero (₮1.87 in chips)
Seat 4: 6bf9b1a2 (₮2.16 in chips)
Seat 5: 2030ed1d (₮2.10 in chips)
2030ed1d: posts small blind ₮0.01
5e676256: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 5e676256
Dealt to 1dc92cc9
Dealt to Hero [9d 5s]
Dealt to 6bf9b1a2
Dealt to 2030ed1d
1dc92cc9: folds
Hero: folds
6bf9b1a2: folds
2030ed1d: folds
5e676256: RETURN ₮0.01
*** SHOWDOWN ***
5e676256 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:42:17 CEST
Seat 1: 5e676256 won (₮0.02)
Seat 2: 1dc92cc9 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 6bf9b1a2 folded before Flop (didn't bet)
Seat 5: 2030ed1d folded before Flop (didn't bet)
```

#### Hand 6343041016 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041016: NLH (₮0.01/₮0.02) 2026/06/08 01:42:33 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 776ee23c (₮1.51 in chips)
Seat 2: fea96e8d (₮4.83 in chips)
Seat 4: 77712cf3 (₮1.03 in chips)
Seat 5: 2857aef0 (₮1.57 in chips)
Seat 6: Hero (₮2.09 in chips)
2857aef0: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 776ee23c
Dealt to fea96e8d
Dealt to 77712cf3
Dealt to 2857aef0
Dealt to Hero [Td 3d]
776ee23c: folds
fea96e8d: folds
77712cf3: calls ₮0.02
2857aef0: calls ₮0.01
Hero: checks
*** FLOP *** [8d Js 9c]
2857aef0: bets ₮0.06
Hero: folds
77712cf3: raises ₮0.18 to ₮0.24
2857aef0: folds
77712cf3: RETURN ₮0.18
*** SHOWDOWN ***
77712cf3 collected ₮0.17 from pot
*** SUMMARY ***
Total pot ₮0.18 | Rake ₮0.01
Hand was run once
Board [ 8d Js 9c ]
Game ended: 2026/06/08 01:43:12 CEST
Seat 1: 776ee23c folded before Flop (didn't bet)
Seat 2: fea96e8d folded before Flop (didn't bet)
Seat 4: 77712cf3 won (₮0.17)
Seat 5: 2857aef0 folded on the Flop
Seat 6: Hero folded on the Flop
```

#### Hand 6375710078 (RETURN)

Expected Hero result: 0.09; Current parser result: 0.09; Discrepancy: 0.00.

```text
CoinPoker Hand #6375710078: NLH (₮0.01/₮0.02) 2026/06/08 01:42:39 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: eeb4d1a7 (₮3.05 in chips)
Seat 2: 44926fdd (₮3.41 in chips)
Seat 3: e5001ca2 (₮1.76 in chips)
Seat 4: 174b2f50 (₮2 in chips)
Seat 5: Hero (₮2.82 in chips)
eeb4d1a7: posts small blind ₮0.01
44926fdd: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to eeb4d1a7
Dealt to 44926fdd
Dealt to e5001ca2
Dealt to 174b2f50
Dealt to Hero [As Ah]
e5001ca2: folds
174b2f50: calls ₮0.02
Hero: raises ₮0.05 to ₮0.07
eeb4d1a7: folds
44926fdd: folds
174b2f50: calls ₮0.05
*** FLOP *** [Th 5h 8s]
174b2f50: checks
Hero: bets ₮0.06
174b2f50: folds
Hero: RETURN ₮0.06
*** SHOWDOWN ***
Hero collected ₮0.16 from pot
*** SUMMARY ***
Total pot ₮0.17 | Rake ₮0.01
Hand was run once
Board [ Th 5h 8s ]
Game ended: 2026/06/08 01:43:01 CEST
Seat 1: eeb4d1a7 folded before Flop (didn't bet)
Seat 2: 44926fdd folded before Flop (didn't bet)
Seat 3: e5001ca2 folded before Flop (didn't bet)
Seat 4: 174b2f50 folded on the Flop
Seat 5: Hero showed [As Ah] and won (₮0.16)
```

#### Hand 6343041017 (RETURN, auto big blind)

Expected Hero result: -0.16; Current parser result: -0.16; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041017: NLH (₮0.01/₮0.02) 2026/06/08 01:43:17 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: c9d5c724 (₮1.51 in chips)
Seat 2: 6e052816 (₮4.83 in chips)
Seat 3: 6d0fae06 (₮0.80 in chips)
Seat 4: 12ccd7d3 (₮1.12 in chips)
Seat 5: ae82273e (₮1.49 in chips)
Seat 6: Hero (₮2.07 in chips)
Hero: posts small blind ₮0.01
c9d5c724: posts big blind ₮0.02
6d0fae06: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to c9d5c724
Dealt to 6e052816
Dealt to 6d0fae06
Dealt to 12ccd7d3
Dealt to ae82273e
Dealt to Hero [3s 3c]
6e052816: folds
6d0fae06: checks
12ccd7d3: raises ₮0.02 to ₮0.04
ae82273e: folds
Hero: calls ₮0.03
c9d5c724: calls ₮0.02
6d0fae06: calls ₮0.02
*** FLOP *** [9d 2h 9s]
Hero: checks
c9d5c724: checks
6d0fae06: bets ₮0.12
12ccd7d3: calls ₮0.12
Hero: calls ₮0.12
c9d5c724: folds
*** TURN *** [9d 2h 9s] [Js]
Hero: checks
6d0fae06: checks
12ccd7d3: bets ₮0.39
Hero: folds
6d0fae06: folds
12ccd7d3: RETURN ₮0.39
*** SHOWDOWN ***
12ccd7d3 collected ₮0.49 from pot
*** SUMMARY ***
Total pot ₮0.52 | Rake ₮0.03
Hand was run once
Board [ 9d 2h 9s Js ]
Game ended: 2026/06/08 01:44:36 CEST
Seat 1: c9d5c724 folded on the Flop
Seat 2: 6e052816 folded before Flop (didn't bet)
Seat 3: 6d0fae06 folded on the Turn
Seat 4: 12ccd7d3 won (₮0.49)
Seat 5: ae82273e folded before Flop (didn't bet)
Seat 6: Hero folded on the Turn
```

#### Hand 6353370706 (RETURN, auto big blind)

Expected Hero result: 0.03; Current parser result: 0.03; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370706: NLH (₮0.01/₮0.02) 2026/06/08 01:43:48 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 36cb602f (₮2.54 in chips)
Seat 2: 1f4b9937 (₮2 in chips)
Seat 3: Hero (₮1.87 in chips)
Seat 4: 8d609beb (₮2.11 in chips)
Seat 5: e3516ce9 (₮2.04 in chips)
Seat 6: 07e78143 (₮0.80 in chips)
1f4b9937: posts small blind ₮0.01
Hero: posts big blind ₮0.02
07e78143: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to 36cb602f
Dealt to 1f4b9937
Dealt to Hero [7d 6d]
Dealt to 8d609beb
Dealt to e3516ce9
Dealt to 07e78143
8d609beb: folds
e3516ce9: folds
07e78143: checks
36cb602f: folds
1f4b9937: folds
Hero: raises ₮0.04 to ₮0.06
07e78143: folds
Hero: RETURN ₮0.04
*** SHOWDOWN ***
Hero collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:44:07 CEST
Seat 1: 36cb602f folded before Flop (didn't bet)
Seat 2: 1f4b9937 folded before Flop (didn't bet)
Seat 3: Hero showed [7d 6d] and won (₮0.05)
Seat 4: 8d609beb folded before Flop (didn't bet)
Seat 5: e3516ce9 folded before Flop (didn't bet)
Seat 6: 07e78143 folded before Flop (didn't bet)
```

#### Hand 6353370707 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370707: NLH (₮0.01/₮0.02) 2026/06/08 01:44:12 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 2c5ab55e (₮2.54 in chips)
Seat 2: 4379ac27 (₮2 in chips)
Seat 3: Hero (₮1.90 in chips)
Seat 4: 1e277dd2 (₮2.11 in chips)
Seat 5: 6a43afab (₮2.04 in chips)
Seat 6: 7db1ce6c (₮0.78 in chips)
Hero: posts small blind ₮0.01
1e277dd2: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 2c5ab55e
Dealt to 4379ac27
Dealt to Hero [7c 5d]
Dealt to 1e277dd2
Dealt to 6a43afab
Dealt to 7db1ce6c
6a43afab: folds
7db1ce6c: calls ₮0.02
2c5ab55e: raises ₮0.04 to ₮0.06
4379ac27: folds
Hero: folds
1e277dd2: calls ₮0.04
7db1ce6c: calls ₮0.04
*** FLOP *** [3h 2c 8h]
1e277dd2: checks
7db1ce6c: checks
2c5ab55e: checks
*** TURN *** [3h 2c 8h] [Ks]
1e277dd2: checks
7db1ce6c: bets ₮0.14
2c5ab55e: folds
1e277dd2: folds
7db1ce6c: RETURN ₮0.14
*** SHOWDOWN ***
7db1ce6c collected ₮0.18 from pot
*** SUMMARY ***
Total pot ₮0.19 | Rake ₮0.01
Hand was run once
Board [ 3h 2c 8h Ks ]
Game ended: 2026/06/08 01:44:53 CEST
Seat 1: 2c5ab55e folded on the Turn
Seat 2: 4379ac27 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 1e277dd2 folded on the Turn
Seat 5: 6a43afab folded before Flop (didn't bet)
Seat 6: 7db1ce6c won (₮0.18)
```

#### Hand 6353370708 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370708: NLH (₮0.01/₮0.02) 2026/06/08 01:44:58 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 02374887 (₮2.48 in chips)
Seat 2: b43925a3 (₮2 in chips)
Seat 3: Hero (₮1.89 in chips)
Seat 4: c92f9dfe (₮2.05 in chips)
Seat 5: 1c155e9b (₮2.04 in chips)
Seat 6: 33543417 (₮0.90 in chips)
c92f9dfe: posts small blind ₮0.01
1c155e9b: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 02374887
Dealt to b43925a3
Dealt to Hero [Jd 4c]
Dealt to c92f9dfe
Dealt to 1c155e9b
Dealt to 33543417
33543417: folds
02374887: raises ₮0.03 to ₮0.05
b43925a3: folds
Hero: folds
c92f9dfe: folds
1c155e9b: folds
02374887: RETURN ₮0.03
*** SHOWDOWN ***
02374887 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:45:15 CEST
Seat 1: 02374887 won (₮0.05)
Seat 2: b43925a3 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: c92f9dfe folded before Flop (didn't bet)
Seat 5: 1c155e9b folded before Flop (didn't bet)
Seat 6: 33543417 folded before Flop (didn't bet)
```

#### Hand 6353370709 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370709: NLH (₮0.01/₮0.02) 2026/06/08 01:45:20 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 8115279f (₮2.51 in chips)
Seat 2: 26d8ccdb (₮2 in chips)
Seat 3: Hero (₮1.89 in chips)
Seat 4: afdcd808 (₮2.04 in chips)
Seat 5: 638def53 (₮2.02 in chips)
Seat 6: 49e702b4 (₮0.90 in chips)
638def53: posts small blind ₮0.01
49e702b4: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 8115279f
Dealt to 26d8ccdb
Dealt to Hero [4c 3h]
Dealt to afdcd808
Dealt to 638def53
Dealt to 49e702b4
8115279f: raises ₮0.03 to ₮0.05
26d8ccdb: folds
Hero: folds
afdcd808: folds
638def53: folds
49e702b4: raises ₮0.08 to ₮0.13
8115279f: calls ₮0.08
*** FLOP *** [2s 6d 5s]
49e702b4: bets ₮0.20
8115279f: folds
49e702b4: RETURN ₮0.20
*** SHOWDOWN ***
49e702b4 collected ₮0.26 from pot
*** SUMMARY ***
Total pot ₮0.27 | Rake ₮0.01
Hand was run once
Board [ 2s 6d 5s ]
Game ended: 2026/06/08 01:46:03 CEST
Seat 1: 8115279f folded on the Flop
Seat 2: 26d8ccdb folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: afdcd808 folded before Flop (didn't bet)
Seat 5: 638def53 folded before Flop (didn't bet)
Seat 6: 49e702b4 won (₮0.26)
```

#### Hand 6353370710 (RETURN)

Expected Hero result: 0.26; Current parser result: 0.26; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370710: NLH (₮0.01/₮0.02) 2026/06/08 01:46:08 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: e068fdc5 (₮2.38 in chips)
Seat 2: 5ac8304e (₮2 in chips)
Seat 3: Hero (₮1.89 in chips)
Seat 4: 5952ca37 (₮2.04 in chips)
Seat 5: ec4f9039 (₮2.01 in chips)
Seat 6: 9790ddc6 (₮1.03 in chips)
9790ddc6: posts small blind ₮0.01
e068fdc5: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to e068fdc5
Dealt to 5ac8304e
Dealt to Hero [Kc 8c]
Dealt to 5952ca37
Dealt to ec4f9039
Dealt to 9790ddc6
5ac8304e: folds
Hero: raises ₮0.03 to ₮0.05
5952ca37: folds
ec4f9039: raises ₮0.10 to ₮0.15
9790ddc6: folds
e068fdc5: folds
Hero: calls ₮0.10
*** FLOP *** [Js 8d 3c]
Hero: checks
ec4f9039: bets ₮0.11
Hero: calls ₮0.11
*** TURN *** [Js 8d 3c] [5c]
Hero: checks
ec4f9039: checks
*** RIVER *** [Js 8d 3c 5c] [6c]
Hero: bets ₮0.18
ec4f9039: folds
Hero: RETURN ₮0.18
*** SHOWDOWN ***
Hero collected ₮0.52 from pot
*** SUMMARY ***
Total pot ₮0.55 | Rake ₮0.03
Hand was run once
Board [ Js 8d 3c 5c 6c ]
Game ended: 2026/06/08 01:47:16 CEST
Seat 1: e068fdc5 folded before Flop (didn't bet)
Seat 2: 5ac8304e folded before Flop (didn't bet)
Seat 3: Hero showed [Kc 8c] and won (₮0.52)
Seat 4: 5952ca37 folded before Flop (didn't bet)
Seat 5: ec4f9039 folded on the River
Seat 6: 9790ddc6 folded before Flop (didn't bet)
```

#### Hand 6343041019 (RETURN)

Expected Hero result: 0.15; Current parser result: 0.15; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041019: NLH (₮0.01/₮0.02) 2026/06/08 01:46:36 CEST
Table '200588' 6-max Seat #1 is the button
Seat 5: a9d031a2 (₮2.11 in chips)
Seat 1: d3b04201 (₮1.46 in chips)
Seat 2: fe82b440 (₮4.81 in chips)
Seat 3: b3a791ac (₮0.64 in chips)
Seat 4: 233a7490 (₮1.45 in chips)
Seat 6: Hero (₮1.25 in chips)
fe82b440: posts small blind ₮0.01
b3a791ac: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to a9d031a2
Dealt to d3b04201
Dealt to fe82b440
Dealt to b3a791ac
Dealt to 233a7490
Dealt to Hero [As 6c]
233a7490: calls ₮0.02
a9d031a2: folds
Hero: raises ₮0.05 to ₮0.07
d3b04201: folds
fe82b440: calls ₮0.06
b3a791ac: folds
233a7490: calls ₮0.05
*** FLOP *** [5s Ah 6h]
fe82b440: checks
233a7490: checks
Hero: bets ₮0.08
fe82b440: folds
233a7490: folds
Hero: RETURN ₮0.08
*** SHOWDOWN ***
Hero collected ₮0.22 from pot
*** SUMMARY ***
Total pot ₮0.23 | Rake ₮0.01
Hand was run once
Board [ 5s Ah 6h ]
Game ended: 2026/06/08 01:47:37 CEST
Seat 5: a9d031a2 folded before Flop (didn't bet)
Seat 1: d3b04201 folded before Flop (didn't bet)
Seat 2: fe82b440 folded on the Flop
Seat 3: b3a791ac folded before Flop (didn't bet)
Seat 4: 233a7490 folded on the Flop
Seat 6: Hero showed [As 6c] and won (₮0.22)
```

#### Hand 6343041021 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041021: NLH (₮0.01/₮0.02) 2026/06/08 01:48:36 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 42e32fb6 (₮1.46 in chips)
Seat 2: b5e94921 (₮4.74 in chips)
Seat 3: f054e975 (₮0.61 in chips)
Seat 4: 69159b41 (₮1.08 in chips)
Seat 5: 36681499 (₮2 in chips)
Seat 6: Hero (₮2.28 in chips)
69159b41: posts small blind ₮0.01
36681499: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 42e32fb6
Dealt to b5e94921
Dealt to f054e975
Dealt to 69159b41
Dealt to 36681499
Dealt to Hero [8c 4s]
Hero: folds
42e32fb6: folds
b5e94921: folds
f054e975: calls ₮0.02
69159b41: folds
36681499: checks
*** FLOP *** [Td Ts Jd]
36681499: checks
f054e975: bets ₮0.04
36681499: folds
f054e975: RETURN ₮0.04
*** SHOWDOWN ***
f054e975 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [ Td Ts Jd ]
Game ended: 2026/06/08 01:49:14 CEST
Seat 1: 42e32fb6 folded before Flop (didn't bet)
Seat 2: b5e94921 folded before Flop (didn't bet)
Seat 3: f054e975 won (₮0.05)
Seat 4: 69159b41 folded before Flop (didn't bet)
Seat 5: 36681499 folded on the Flop
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6353370713 (RETURN)

Expected Hero result: 0.02; Current parser result: 0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370713: NLH (₮0.01/₮0.02) 2026/06/08 01:49:18 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 976c6a50 (₮3.82 in chips)
Seat 2: 2e6c861d (₮2 in chips)
Seat 3: Hero (₮1.90 in chips)
Seat 4: 46a586a7 (₮2.31 in chips)
Seat 5: d22c5571 (₮2 in chips)
Seat 6: 14fe1ebe (₮1.02 in chips)
Hero: posts small blind ₮0.01
46a586a7: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 976c6a50
Dealt to 2e6c861d
Dealt to Hero [Jh Jd]
Dealt to 46a586a7
Dealt to d22c5571
Dealt to 14fe1ebe
d22c5571: folds
14fe1ebe: folds
976c6a50: folds
2e6c861d: folds
Hero: raises ₮0.03 to ₮0.05
46a586a7: folds
Hero: RETURN ₮0.03
*** SHOWDOWN ***
Hero collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:49:35 CEST
Seat 1: 976c6a50 folded before Flop (didn't bet)
Seat 2: 2e6c861d folded before Flop (didn't bet)
Seat 3: Hero showed [Jh Jd] and won (₮0.04)
Seat 4: 46a586a7 folded before Flop (didn't bet)
Seat 5: d22c5571 folded before Flop (didn't bet)
Seat 6: 14fe1ebe folded before Flop (didn't bet)
```

#### Hand 6343041022 (ALLIN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041022: NLH (₮0.01/₮0.02) 2026/06/08 01:49:19 CEST
Table '200588' 6-max Seat #4 is the button
Seat 3: 4a4447fc (₮0.64 in chips)
Seat 1: c568e024 (₮1.46 in chips)
Seat 2: 704a2c16 (₮4.74 in chips)
Seat 4: 02f594b8 (₮1.07 in chips)
Seat 5: c26f171f (₮1.98 in chips)
Seat 6: Hero (₮2.28 in chips)
c26f171f: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 4a4447fc
Dealt to c568e024
Dealt to 704a2c16
Dealt to 02f594b8
Dealt to c26f171f
Dealt to Hero [Td 2s]
c568e024: folds
704a2c16: folds
4a4447fc: calls ₮0.02
02f594b8: calls ₮0.02
c26f171f: raises ₮0.15 to ₮0.17
Hero: folds
4a4447fc: calls ₮0.15
02f594b8: calls ₮0.15
*** FLOP *** [5h 2c 8d]
c26f171f: checks
4a4447fc: bets ₮0.40
02f594b8: calls ₮0.40
c26f171f: folds
*** TURN *** [5h 2c 8d] [8h]
4a4447fc: ALLIN ₮0.07
02f594b8: calls ₮0.07
*** RIVER *** [5h 2c 8d 8h] [Ad]
*** SHOWDOWN ***
02f594b8: shows [Ac 7s] (Two Pair)
02f594b8 collected ₮1.40 from pot
4a4447fc: shows [Qc Ts] (One Pair)
*** SUMMARY ***
Total pot ₮1.47 | Rake ₮0.07
Hand was run once
Board [ 5h 2c 8d 8h Ad ]
Game ended: 2026/06/08 01:50:34 CEST
Seat 3: 4a4447fc showed [Qc Ts] and lost with One Pair
Seat 1: c568e024 folded before Flop (didn't bet)
Seat 2: 704a2c16 folded before Flop (didn't bet)
Seat 4: 02f594b8 showed [Ac 7s] and won (₮1.40) with Two Pair
Seat 5: c26f171f folded on the Flop
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6353370714 (RETURN)

Expected Hero result: 0.03; Current parser result: 0.03; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370714: NLH (₮0.01/₮0.02) 2026/06/08 01:49:40 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: ccd07b60 (₮3.82 in chips)
Seat 2: ad96f3a1 (₮2 in chips)
Seat 3: Hero (₮1.92 in chips)
Seat 4: 3e88716a (₮2.29 in chips)
Seat 5: dcc5e3ac (₮2 in chips)
Seat 6: 7981c393 (₮1.02 in chips)
3e88716a: posts small blind ₮0.01
dcc5e3ac: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to ccd07b60
Dealt to ad96f3a1
Dealt to Hero [Kh Qc]
Dealt to 3e88716a
Dealt to dcc5e3ac
Dealt to 7981c393
7981c393: folds
ccd07b60: folds
ad96f3a1: folds
Hero: raises ₮0.03 to ₮0.05
3e88716a: folds
dcc5e3ac: folds
Hero: RETURN ₮0.03
*** SHOWDOWN ***
Hero collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:49:53 CEST
Seat 1: ccd07b60 folded before Flop (didn't bet)
Seat 2: ad96f3a1 folded before Flop (didn't bet)
Seat 3: Hero showed [Kh Qc] and won (₮0.05)
Seat 4: 3e88716a folded before Flop (didn't bet)
Seat 5: dcc5e3ac folded before Flop (didn't bet)
Seat 6: 7981c393 folded before Flop (didn't bet)
```

#### Hand 6353370715 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370715: NLH (₮0.01/₮0.02) 2026/06/08 01:49:57 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 25a4c079 (₮3.82 in chips)
Seat 2: ab9407df (₮2 in chips)
Seat 3: Hero (₮1.95 in chips)
Seat 4: bdc6270b (₮2.28 in chips)
Seat 5: 71119f65 (₮1.98 in chips)
Seat 6: c33056aa (₮1.02 in chips)
71119f65: posts small blind ₮0.01
c33056aa: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 25a4c079
Dealt to ab9407df
Dealt to Hero [9h 2d]
Dealt to bdc6270b
Dealt to 71119f65
Dealt to c33056aa
25a4c079: folds
ab9407df: folds
Hero: folds
bdc6270b: folds
71119f65: raises ₮0.02 to ₮0.04
c33056aa: folds
71119f65: RETURN ₮0.02
*** SHOWDOWN ***
71119f65 collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:50:17 CEST
Seat 1: 25a4c079 folded before Flop (didn't bet)
Seat 2: ab9407df folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: bdc6270b folded before Flop (didn't bet)
Seat 5: 71119f65 won (₮0.04)
Seat 6: c33056aa folded before Flop (didn't bet)
```

#### Hand 6343041023 (RETURN)

Expected Hero result: 0.14; Current parser result: 0.14; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041023: NLH (₮0.01/₮0.02) 2026/06/08 01:50:40 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: b7d5afa5 (₮1.46 in chips)
Seat 2: 4fa738df (₮4.74 in chips)
Seat 4: b37c6410 (₮1.83 in chips)
Seat 5: 79b41274 (₮1.81 in chips)
Seat 6: Hero (₮2.26 in chips)
Hero: posts small blind ₮0.01
b7d5afa5: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to b7d5afa5
Dealt to 4fa738df
Dealt to b37c6410
Dealt to 79b41274
Dealt to Hero [Ah 3h]
4fa738df: folds
b37c6410: calls ₮0.02
79b41274: folds
Hero: raises ₮0.04 to ₮0.06
b7d5afa5: folds
b37c6410: calls ₮0.04
*** FLOP *** [9h 4c Ks]
Hero: bets ₮0.07
b37c6410: calls ₮0.07
*** TURN *** [9h 4c Ks] [7d]
Hero: checks
b37c6410: checks
*** RIVER *** [9h 4c Ks 7d] [Jd]
Hero: bets ₮0.21
b37c6410: folds
Hero: RETURN ₮0.21
*** SHOWDOWN ***
Hero collected ₮0.27 from pot
*** SUMMARY ***
Total pot ₮0.28 | Rake ₮0.01
Hand was run once
Board [ 9h 4c Ks 7d Jd ]
Game ended: 2026/06/08 01:51:22 CEST
Seat 1: b7d5afa5 folded before Flop (didn't bet)
Seat 2: 4fa738df folded before Flop (didn't bet)
Seat 4: b37c6410 folded on the River
Seat 5: 79b41274 folded before Flop (didn't bet)
Seat 6: Hero showed [Ah 3h] and won (₮0.27)
```

#### Hand 6353370717 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370717: NLH (₮0.01/₮0.02) 2026/06/08 01:51:09 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: b051caf2 (₮3.81 in chips)
Seat 2: 6e5704ed (₮2 in chips)
Seat 3: Hero (₮1.95 in chips)
Seat 4: a6d91689 (₮2.28 in chips)
Seat 5: a4ceb50b (₮2 in chips)
Seat 6: 56f91d42 (₮0.99 in chips)
b051caf2: posts small blind ₮0.01
6e5704ed: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to b051caf2
Dealt to 6e5704ed
Dealt to Hero [7h 3c]
Dealt to a6d91689
Dealt to a4ceb50b
Dealt to 56f91d42
Hero: folds
a6d91689: folds
a4ceb50b: folds
56f91d42: folds
b051caf2: folds
6e5704ed: RETURN ₮0.01
*** SHOWDOWN ***
6e5704ed collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:51:41 CEST
Seat 1: b051caf2 folded before Flop (didn't bet)
Seat 2: 6e5704ed won (₮0.02)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: a6d91689 folded before Flop (didn't bet)
Seat 5: a4ceb50b folded before Flop (didn't bet)
Seat 6: 56f91d42 folded before Flop (didn't bet)
```

#### Hand 6343041024 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041024: NLH (₮0.01/₮0.02) 2026/06/08 01:51:26 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: ae97fdd2 (₮1.44 in chips)
Seat 2: efcd4ec6 (₮4.74 in chips)
Seat 4: d6cee4b3 (₮1.70 in chips)
Seat 5: 9dc3033a (₮1.81 in chips)
Seat 6: Hero (₮2.40 in chips)
ae97fdd2: posts small blind ₮0.01
efcd4ec6: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to ae97fdd2
Dealt to efcd4ec6
Dealt to d6cee4b3
Dealt to 9dc3033a
Dealt to Hero [Ks 3h]
d6cee4b3: folds
9dc3033a: folds
Hero: folds
ae97fdd2: calls ₮0.01
efcd4ec6: checks
*** FLOP *** [9h 5s As]
ae97fdd2: bets ₮0.03
efcd4ec6: folds
ae97fdd2: RETURN ₮0.03
*** SHOWDOWN ***
ae97fdd2 collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [ 9h 5s As ]
Game ended: 2026/06/08 01:51:59 CEST
Seat 1: ae97fdd2 won (₮0.04)
Seat 2: efcd4ec6 folded on the Flop
Seat 4: d6cee4b3 folded before Flop (didn't bet)
Seat 5: 9dc3033a folded before Flop (didn't bet)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6353370718 (RETURN, ALLIN)

Expected Hero result: -1.95; Current parser result: -1.95; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370718: NLH (₮0.01/₮0.02) 2026/06/08 01:51:46 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 87bb380f (₮3.80 in chips)
Seat 2: 3f6cca17 (₮2.01 in chips)
Seat 3: Hero (₮1.95 in chips)
Seat 4: e7c41d8b (₮2.28 in chips)
Seat 5: 3f48a0eb (₮2 in chips)
Seat 6: 93d423d8 (₮0.99 in chips)
3f6cca17: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 87bb380f
Dealt to 3f6cca17
Dealt to Hero [5h 4d]
Dealt to e7c41d8b
Dealt to 3f48a0eb
Dealt to 93d423d8
e7c41d8b: folds
3f48a0eb: raises ₮0.02 to ₮0.04
93d423d8: folds
87bb380f: calls ₮0.04
3f6cca17: calls ₮0.03
Hero: calls ₮0.02
*** FLOP *** [7s 3h 2s]
3f6cca17: checks
Hero: checks
3f48a0eb: bets ₮0.12
87bb380f: folds
3f6cca17: raises ₮0.18 to ₮0.30
Hero: calls ₮0.30
3f48a0eb: ALLIN ₮1.84
3f6cca17: ALLIN ₮1.67
Hero: ALLIN ₮1.61
3f6cca17: RETURN ₮0.01
*** TURN *** [7s 3h 2s] [9d]
*** RIVER *** [7s 3h 2s 9d] [8h]
*** SHOWDOWN ***
3f48a0eb: shows [Kc Kd] (One Pair)
3f48a0eb collected ₮5.69 from pot
3f48a0eb: shows [Kc Kd] (One Pair)
3f48a0eb collected ₮0.10 from pot
3f6cca17: shows [Ah 7d] (One Pair)
Hero: shows [5h 4d] (High Card)
*** SUMMARY ***
Total pot ₮5.99 | Rake ₮0.20
Hand was run once
Board [ 7s 3h 2s 9d 8h ]
Game ended: 2026/06/08 01:53:05 CEST
Seat 1: 87bb380f folded on the Flop
Seat 2: 3f6cca17 showed [Ah 7d] and lost with One Pair
Seat 3: Hero showed [5h 4d] and lost with High Card
Seat 4: e7c41d8b folded before Flop (didn't bet)
Seat 5: 3f48a0eb showed [Kc Kd] and won (₮5.69) with One Pair
Seat 6: 93d423d8 folded before Flop (didn't bet)
```

#### Hand 6343041025 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041025: NLH (₮0.01/₮0.02) 2026/06/08 01:52:04 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 132f1682 (₮1.46 in chips)
Seat 2: 586be3db (₮4.72 in chips)
Seat 3: d90ad7f9 (₮2 in chips)
Seat 4: 4d6f0df9 (₮1.70 in chips)
Seat 5: 757c2cdc (₮1.81 in chips)
Seat 6: Hero (₮2.40 in chips)
586be3db: posts small blind ₮0.01
d90ad7f9: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 132f1682
Dealt to 586be3db
Dealt to d90ad7f9
Dealt to 4d6f0df9
Dealt to 757c2cdc
Dealt to Hero [Tc 7d]
4d6f0df9: folds
757c2cdc: folds
Hero: folds
132f1682: folds
586be3db: raises ₮0.04 to ₮0.06
d90ad7f9: folds
586be3db: RETURN ₮0.04
*** SHOWDOWN ***
586be3db collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:52:16 CEST
Seat 1: 132f1682 folded before Flop (didn't bet)
Seat 2: 586be3db won (₮0.04)
Seat 3: d90ad7f9 folded before Flop (didn't bet)
Seat 4: 4d6f0df9 folded before Flop (didn't bet)
Seat 5: 757c2cdc folded before Flop (didn't bet)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6343041026 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041026: NLH (₮0.01/₮0.02) 2026/06/08 01:52:21 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 4a282786 (₮1.46 in chips)
Seat 2: 5649bef2 (₮4.74 in chips)
Seat 3: ebfbdc8f (₮1.98 in chips)
Seat 4: cc8ffc51 (₮1.70 in chips)
Seat 5: 35107742 (₮1.81 in chips)
Seat 6: Hero (₮2.40 in chips)
ebfbdc8f: posts small blind ₮0.01
cc8ffc51: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 4a282786
Dealt to 5649bef2
Dealt to ebfbdc8f
Dealt to cc8ffc51
Dealt to 35107742
Dealt to Hero [Jh 6c]
35107742: folds
Hero: folds
4a282786: raises ₮0.03 to ₮0.05
5649bef2: calls ₮0.05
ebfbdc8f: calls ₮0.04
cc8ffc51: calls ₮0.03
*** FLOP *** [6d 7c 8d]
ebfbdc8f: checks
cc8ffc51: bets ₮0.02
4a282786: calls ₮0.02
5649bef2: calls ₮0.02
ebfbdc8f: raises ₮0.29 to ₮0.31
cc8ffc51: folds
4a282786: folds
5649bef2: folds
ebfbdc8f: RETURN ₮0.29
*** SHOWDOWN ***
ebfbdc8f collected ₮0.27 from pot
*** SUMMARY ***
Total pot ₮0.28 | Rake ₮0.01
Hand was run once
Board [ 6d 7c 8d ]
Game ended: 2026/06/08 01:53:40 CEST
Seat 1: 4a282786 folded on the Flop
Seat 2: 5649bef2 folded on the Flop
Seat 3: ebfbdc8f won (₮0.27)
Seat 4: cc8ffc51 folded on the Flop
Seat 5: 35107742 folded before Flop (didn't bet)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6343041027 (RETURN)

Expected Hero result: -0.16; Current parser result: -0.16; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041027: NLH (₮0.01/₮0.02) 2026/06/08 01:53:45 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: e1382b5b (₮1.39 in chips)
Seat 2: e0cd9d1f (₮4.67 in chips)
Seat 3: 4d508d7f (₮2.18 in chips)
Seat 4: 00b220af (₮1.63 in chips)
Seat 6: Hero (₮2.40 in chips)
00b220af: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to e1382b5b
Dealt to e0cd9d1f
Dealt to 4d508d7f
Dealt to 00b220af
Dealt to Hero [Kc 5c]
e1382b5b: folds
e0cd9d1f: raises ₮0.03 to ₮0.05
4d508d7f: folds
00b220af: calls ₮0.04
Hero: calls ₮0.03
*** FLOP *** [Jd 6c Td]
00b220af: checks
Hero: checks
e0cd9d1f: checks
*** TURN *** [Jd 6c Td] [5h]
00b220af: checks
Hero: checks
e0cd9d1f: checks
*** RIVER *** [Jd 6c Td 5h] [8s]
00b220af: checks
Hero: bets ₮0.11
e0cd9d1f: raises ₮0.30 to ₮0.41
00b220af: folds
Hero: folds
e0cd9d1f: RETURN ₮0.30
*** SHOWDOWN ***
e0cd9d1f collected ₮0.35 from pot
*** SUMMARY ***
Total pot ₮0.37 | Rake ₮0.02
Hand was run once
Board [ Jd 6c Td 5h 8s ]
Game ended: 2026/06/08 01:54:50 CEST
Seat 1: e1382b5b folded before Flop (didn't bet)
Seat 2: e0cd9d1f won (₮0.35)
Seat 3: 4d508d7f folded before Flop (didn't bet)
Seat 4: 00b220af folded on the River
Seat 6: Hero folded on the River
```

#### Hand 6343041028 (RETURN)

Expected Hero result: 0.19; Current parser result: 0.19; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041028: NLH (₮0.01/₮0.02) 2026/06/08 01:54:55 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: e1bba135 (₮1.39 in chips)
Seat 2: 8a6d4623 (₮4.86 in chips)
Seat 3: c47579fa (₮2.18 in chips)
Seat 4: 6243669f (₮1.58 in chips)
Seat 6: Hero (₮2.24 in chips)
Hero: posts small blind ₮0.01
e1bba135: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to e1bba135
Dealt to 8a6d4623
Dealt to c47579fa
Dealt to 6243669f
Dealt to Hero [Kh Kd]
8a6d4623: raises ₮0.03 to ₮0.05
c47579fa: folds
6243669f: calls ₮0.05
Hero: raises ₮0.09 to ₮0.14
e1bba135: folds
8a6d4623: folds
6243669f: calls ₮0.09
*** FLOP *** [5c Ac 7d]
Hero: bets ₮0.12
6243669f: folds
Hero: RETURN ₮0.12
*** SHOWDOWN ***
Hero collected ₮0.33 from pot
*** SUMMARY ***
Total pot ₮0.35 | Rake ₮0.02
Hand was run once
Board [ 5c Ac 7d ]
Game ended: 2026/06/08 01:55:37 CEST
Seat 1: e1bba135 folded before Flop (didn't bet)
Seat 2: 8a6d4623 folded before Flop (didn't bet)
Seat 3: c47579fa folded before Flop (didn't bet)
Seat 4: 6243669f folded on the Flop
Seat 6: Hero showed [Kh Kd] and won (₮0.33)
```

#### Hand 6343041029 (RETURN, ALLIN, auto big blind)

Expected Hero result: -0.06; Current parser result: -0.06; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041029: NLH (₮0.01/₮0.02) 2026/06/08 01:55:42 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: a4c8e409 (₮1.37 in chips)
Seat 2: f15537d5 (₮4.81 in chips)
Seat 3: 2bbe6b47 (₮2.18 in chips)
Seat 4: f68a9f8c (₮1.44 in chips)
Seat 5: c04b5b29 (₮2 in chips)
Seat 6: Hero (₮2.43 in chips)
a4c8e409: posts small blind ₮0.01
f15537d5: posts big blind ₮0.02
c04b5b29: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to a4c8e409
Dealt to f15537d5
Dealt to 2bbe6b47
Dealt to f68a9f8c
Dealt to c04b5b29
Dealt to Hero [7h 6c]
2bbe6b47: folds
f68a9f8c: calls ₮0.02
c04b5b29: checks
Hero: raises ₮0.04 to ₮0.06
a4c8e409: folds
f15537d5: calls ₮0.04
f68a9f8c: calls ₮0.04
c04b5b29: folds
*** FLOP *** [2s 5d Kd]
f15537d5: checks
f68a9f8c: bets ₮0.10
Hero: folds
f15537d5: raises ₮0.29 to ₮0.39
f68a9f8c: calls ₮0.29
*** TURN *** [2s 5d Kd] [6d]
f15537d5: checks
f68a9f8c: bets ₮0.74
f15537d5: raises ₮0.74 to ₮1.48
f68a9f8c: ALLIN ₮0.25
f15537d5: RETURN ₮0.49
*** RIVER *** [2s 5d Kd 6d] [9d]
*** SHOWDOWN ***
f68a9f8c: shows [Ad Kc] (Flush)
f68a9f8c collected ₮2.82 from pot
f15537d5: shows [2c 2d] (Flush)
*** SUMMARY ***
Total pot ₮2.97 | Rake ₮0.15
Hand was run once
Board [ 2s 5d Kd 6d 9d ]
Game ended: 2026/06/08 01:56:57 CEST
Seat 1: a4c8e409 folded before Flop (didn't bet)
Seat 2: f15537d5 showed [2c 2d] and lost with Flush
Seat 3: 2bbe6b47 folded before Flop (didn't bet)
Seat 4: f68a9f8c showed [Ad Kc] and won (₮2.82) with Flush
Seat 5: c04b5b29 folded before Flop (didn't bet)
Seat 6: Hero folded on the Flop
```

#### Hand 6353370723 (RETURN)

Expected Hero result: 0.01; Current parser result: 0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370723: NLH (₮0.01/₮0.02) 2026/06/08 01:56:31 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 3c0f38c4 (₮3.62 in chips)
Seat 2: d06c14cf (₮2 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: 1578e302 (₮2.22 in chips)
Seat 5: 7fcc747f (₮5.65 in chips)
Seat 6: ee21119b (₮1.62 in chips)
d06c14cf: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 3c0f38c4
Dealt to d06c14cf
Dealt to Hero [Ks 4h]
Dealt to 1578e302
Dealt to 7fcc747f
Dealt to ee21119b
1578e302: folds
7fcc747f: folds
ee21119b: folds
3c0f38c4: folds
d06c14cf: folds
Hero: RETURN ₮0.01
*** SHOWDOWN ***
Hero collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:56:53 CEST
Seat 1: 3c0f38c4 folded before Flop (didn't bet)
Seat 2: d06c14cf folded before Flop (didn't bet)
Seat 3: Hero showed [Ks 4h] and won (₮0.02)
Seat 4: 1578e302 folded before Flop (didn't bet)
Seat 5: 7fcc747f folded before Flop (didn't bet)
Seat 6: ee21119b folded before Flop (didn't bet)
```

#### Hand 6353370724 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370724: NLH (₮0.01/₮0.02) 2026/06/08 01:56:58 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 7121504f (₮3.62 in chips)
Seat 2: 5a372782 (₮2 in chips)
Seat 3: Hero (₮2.01 in chips)
Seat 4: db176472 (₮2.22 in chips)
Seat 5: 4f89500a (₮5.65 in chips)
Seat 6: 8c2ee1e5 (₮1.62 in chips)
Hero: posts small blind ₮0.01
db176472: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 7121504f
Dealt to 5a372782
Dealt to Hero [8s 2d]
Dealt to db176472
Dealt to 4f89500a
Dealt to 8c2ee1e5
4f89500a: raises ₮0.02 to ₮0.04
8c2ee1e5: folds
7121504f: folds
5a372782: folds
Hero: folds
db176472: folds
4f89500a: RETURN ₮0.02
*** SHOWDOWN ***
4f89500a collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:57:16 CEST
Seat 1: 7121504f folded before Flop (didn't bet)
Seat 2: 5a372782 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: db176472 folded before Flop (didn't bet)
Seat 5: 4f89500a won (₮0.05)
Seat 6: 8c2ee1e5 folded before Flop (didn't bet)
```

#### Hand 6343041030 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041030: NLH (₮0.01/₮0.02) 2026/06/08 01:57:03 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 36aeddea (₮1.36 in chips)
Seat 2: 7c083158 (₮3.37 in chips)
Seat 3: 19e2b704 (₮2.18 in chips)
Seat 4: e4bcb054 (₮2.82 in chips)
Seat 5: e5fdfb33 (₮2 in chips)
Seat 6: Hero (₮2.37 in chips)
7c083158: posts small blind ₮0.01
19e2b704: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 36aeddea
Dealt to 7c083158
Dealt to 19e2b704
Dealt to e4bcb054
Dealt to e5fdfb33
Dealt to Hero [Tc 3s]
e4bcb054: folds
e5fdfb33: folds
Hero: folds
36aeddea: folds
7c083158: raises ₮0.04 to ₮0.06
19e2b704: raises ₮0.12 to ₮0.18
7c083158: folds
19e2b704: RETURN ₮0.12
*** SHOWDOWN ***
19e2b704 collected ₮0.12 from pot
*** SUMMARY ***
Total pot ₮0.12 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:57:27 CEST
Seat 1: 36aeddea folded before Flop (didn't bet)
Seat 2: 7c083158 folded before Flop (didn't bet)
Seat 3: 19e2b704 won (₮0.12)
Seat 4: e4bcb054 folded before Flop (didn't bet)
Seat 5: e5fdfb33 folded before Flop (didn't bet)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6353370725 (RETURN, ALLIN)

Expected Hero result: -0.35; Current parser result: -0.35; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370725: NLH (₮0.01/₮0.02) 2026/06/08 01:57:21 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: c0281a67 (₮3.62 in chips)
Seat 2: 7cd12d85 (₮2 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: 5a34f693 (₮2.20 in chips)
Seat 5: 684e90e9 (₮5.68 in chips)
Seat 6: 1a5e7f83 (₮1.62 in chips)
5a34f693: posts small blind ₮0.01
684e90e9: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to c0281a67
Dealt to 7cd12d85
Dealt to Hero [Ac 2s]
Dealt to 5a34f693
Dealt to 684e90e9
Dealt to 1a5e7f83
1a5e7f83: folds
c0281a67: folds
7cd12d85: folds
Hero: raises ₮0.03 to ₮0.05
5a34f693: folds
684e90e9: calls ₮0.03
*** FLOP *** [2c 3h Qh]
684e90e9: checks
Hero: checks
*** TURN *** [2c 3h Qh] [5h]
684e90e9: bets ₮0.08
Hero: calls ₮0.08
*** RIVER *** [2c 3h Qh 5h] [7h]
684e90e9: checks
Hero: bets ₮0.22
684e90e9: ALLIN ₮5.55
Hero: folds
684e90e9: RETURN ₮5.33
*** SHOWDOWN ***
684e90e9 collected ₮0.67 from pot
*** SUMMARY ***
Total pot ₮0.71 | Rake ₮0.04
Hand was run once
Board [ 2c 3h Qh 5h 7h ]
Game ended: 2026/06/08 01:58:19 CEST
Seat 1: c0281a67 folded before Flop (didn't bet)
Seat 2: 7cd12d85 folded before Flop (didn't bet)
Seat 3: Hero folded on the River
Seat 4: 5a34f693 folded before Flop (didn't bet)
Seat 5: 684e90e9 won (₮0.67)
Seat 6: 1a5e7f83 folded before Flop (didn't bet)
```

#### Hand 6343041031 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041031: NLH (₮0.01/₮0.02) 2026/06/08 01:57:32 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: c7228f19 (₮1.36 in chips)
Seat 2: 4cc5e5da (₮3.31 in chips)
Seat 3: 39c3520e (₮2.24 in chips)
Seat 4: e13c181a (₮2.82 in chips)
Seat 5: c93dd4cc (₮2 in chips)
Seat 6: Hero (₮2.37 in chips)
39c3520e: posts small blind ₮0.01
e13c181a: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to c7228f19
Dealt to 4cc5e5da
Dealt to 39c3520e
Dealt to e13c181a
Dealt to c93dd4cc
Dealt to Hero [Td 5c]
c93dd4cc: raises ₮0.02 to ₮0.04
Hero: folds
c7228f19: folds
4cc5e5da: folds
39c3520e: folds
e13c181a: calls ₮0.02
*** FLOP *** [9c 4d 3d]
e13c181a: checks
c93dd4cc: checks
*** TURN *** [9c 4d 3d] [7h]
e13c181a: checks
c93dd4cc: checks
*** RIVER *** [9c 4d 3d 7h] [Tc]
e13c181a: bets ₮0.51
c93dd4cc: folds
e13c181a: RETURN ₮0.51
*** SHOWDOWN ***
e13c181a collected ₮0.09 from pot
*** SUMMARY ***
Total pot ₮0.09 | Rake ₮0
Hand was run once
Board [ 9c 4d 3d 7h Tc ]
Game ended: 2026/06/08 01:58:06 CEST
Seat 1: c7228f19 folded before Flop (didn't bet)
Seat 2: 4cc5e5da folded before Flop (didn't bet)
Seat 3: 39c3520e folded before Flop (didn't bet)
Seat 4: e13c181a won (₮0.09)
Seat 5: c93dd4cc folded on the River
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6343041032 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041032: NLH (₮0.01/₮0.02) 2026/06/08 01:58:11 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: d45e3c0d (₮1.36 in chips)
Seat 2: 94ab70f1 (₮3.31 in chips)
Seat 3: 3c80909f (₮2.23 in chips)
Seat 4: d093650b (₮2.87 in chips)
Seat 5: 79ddd946 (₮2 in chips)
Seat 6: Hero (₮2.37 in chips)
d093650b: posts small blind ₮0.01
79ddd946: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to d45e3c0d
Dealt to 94ab70f1
Dealt to 3c80909f
Dealt to d093650b
Dealt to 79ddd946
Dealt to Hero [Td 6h]
Hero: folds
d45e3c0d: folds
94ab70f1: folds
3c80909f: raises ₮0.04 to ₮0.06
d093650b: folds
79ddd946: folds
3c80909f: RETURN ₮0.04
*** SHOWDOWN ***
3c80909f collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:58:39 CEST
Seat 1: d45e3c0d folded before Flop (didn't bet)
Seat 2: 94ab70f1 folded before Flop (didn't bet)
Seat 3: 3c80909f won (₮0.05)
Seat 4: d093650b folded before Flop (didn't bet)
Seat 5: 79ddd946 folded before Flop (didn't bet)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6353370726 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370726: NLH (₮0.01/₮0.02) 2026/06/08 01:58:24 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 6afb61a3 (₮3.62 in chips)
Seat 2: 242dee6f (₮2 in chips)
Seat 3: Hero (₮1.65 in chips)
Seat 4: f26f7108 (₮2.19 in chips)
Seat 5: 76d65970 (₮6 in chips)
Seat 6: 670b1d49 (₮1.62 in chips)
76d65970: posts small blind ₮0.01
670b1d49: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 6afb61a3
Dealt to 242dee6f
Dealt to Hero [9d 2d]
Dealt to f26f7108
Dealt to 76d65970
Dealt to 670b1d49
6afb61a3: folds
242dee6f: folds
Hero: folds
f26f7108: raises ₮0.02 to ₮0.04
76d65970: folds
670b1d49: folds
f26f7108: RETURN ₮0.02
*** SHOWDOWN ***
f26f7108 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 01:59:22 CEST
Seat 1: 6afb61a3 folded before Flop (didn't bet)
Seat 2: 242dee6f folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: f26f7108 won (₮0.05)
Seat 5: 76d65970 folded before Flop (didn't bet)
Seat 6: 670b1d49 folded before Flop (didn't bet)
```

#### Hand 6353370727 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370727: NLH (₮0.01/₮0.02) 2026/06/08 01:59:27 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: 52a3c957 (₮3.62 in chips)
Seat 2: 30742d3e (₮2 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: ead1c2ec (₮2.22 in chips)
Seat 5: f4ce4883 (₮5.99 in chips)
52a3c957: posts small blind ₮0.01
30742d3e: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 52a3c957
Dealt to 30742d3e
Dealt to Hero [Qs 9d]
Dealt to ead1c2ec
Dealt to f4ce4883
Hero: folds
ead1c2ec: folds
f4ce4883: raises ₮0.02 to ₮0.04
52a3c957: calls ₮0.03
30742d3e: folds
*** FLOP *** [Qc 8h 2d]
52a3c957: checks
f4ce4883: checks
*** TURN *** [Qc 8h 2d] [5s]
52a3c957: bets ₮0.05
f4ce4883: folds
52a3c957: RETURN ₮0.05
*** SHOWDOWN ***
52a3c957 collected ₮0.10 from pot
*** SUMMARY ***
Total pot ₮0.10 | Rake ₮0
Hand was run once
Board [ Qc 8h 2d 5s ]
Game ended: 2026/06/08 01:59:56 CEST
Seat 1: 52a3c957 won (₮0.10)
Seat 2: 30742d3e folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: ead1c2ec folded before Flop (didn't bet)
Seat 5: f4ce4883 folded on the Turn
```

#### Hand 6353370728 (RETURN)

Expected Hero result: 0.14; Current parser result: 0.14; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370728: NLH (₮0.01/₮0.02) 2026/06/08 02:00:01 CEST
Table '200588' 6-max Seat #1 is the button
Seat 4: e1280b75 (₮2.22 in chips)
Seat 1: 89d8639f (₮3.68 in chips)
Seat 2: 43c7bd70 (₮2 in chips)
Seat 3: Hero (₮2 in chips)
Seat 5: ea3e08d1 (₮5.95 in chips)
43c7bd70: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to e1280b75
Dealt to 89d8639f
Dealt to 43c7bd70
Dealt to Hero [Kd Jc]
Dealt to ea3e08d1
e1280b75: folds
ea3e08d1: folds
89d8639f: raises ₮0.03 to ₮0.05
43c7bd70: folds
Hero: calls ₮0.03
*** FLOP *** [Js 3s 8h]
Hero: bets ₮0.04
89d8639f: calls ₮0.04
*** TURN *** [Js 3s 8h] [Kh]
Hero: bets ₮0.06
89d8639f: calls ₮0.06
*** RIVER *** [Js 3s 8h Kh] [2h]
Hero: bets ₮0.16
89d8639f: folds
Hero: RETURN ₮0.16
*** SHOWDOWN ***
Hero collected ₮0.29 from pot
*** SUMMARY ***
Total pot ₮0.31 | Rake ₮0.02
Hand was run once
Board [ Js 3s 8h Kh 2h ]
Game ended: 2026/06/08 02:00:54 CEST
Seat 4: e1280b75 folded before Flop (didn't bet)
Seat 1: 89d8639f folded on the River
Seat 2: 43c7bd70 folded before Flop (didn't bet)
Seat 3: Hero showed [Kd Jc] and won (₮0.29)
Seat 5: ea3e08d1 folded before Flop (didn't bet)
```

#### Hand 6343041034 (RETURN)

Expected Hero result: -0.05; Current parser result: -0.05; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041034: NLH (₮0.01/₮0.02) 2026/06/08 02:00:06 CEST
Table '200588' 6-max Seat #5 is the button
Seat 2: 91967dc8 (₮4.04 in chips)
Seat 1: 05d06050 (₮1.36 in chips)
Seat 3: 16eb54f6 (₮2.26 in chips)
Seat 4: a9441c60 (₮2.30 in chips)
Seat 5: dcfc8308 (₮2 in chips)
Seat 6: Hero (₮2.35 in chips)
Hero: posts small blind ₮0.01
05d06050: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 91967dc8
Dealt to 05d06050
Dealt to 16eb54f6
Dealt to a9441c60
Dealt to dcfc8308
Dealt to Hero [4s 3s]
91967dc8: raises ₮0.03 to ₮0.05
16eb54f6: folds
a9441c60: folds
dcfc8308: folds
Hero: calls ₮0.04
05d06050: calls ₮0.03
*** FLOP *** [5s 2h 5c]
Hero: checks
05d06050: checks
91967dc8: checks
*** TURN *** [5s 2h 5c] [5h]
Hero: checks
05d06050: checks
91967dc8: bets ₮0.10
Hero: folds
05d06050: folds
91967dc8: RETURN ₮0.10
*** SHOWDOWN ***
91967dc8 collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0.01
Hand was run once
Board [ 5s 2h 5c 5h ]
Game ended: 2026/06/08 02:01:06 CEST
Seat 2: 91967dc8 won (₮0.14)
Seat 1: 05d06050 folded on the Turn
Seat 3: 16eb54f6 folded before Flop (didn't bet)
Seat 4: a9441c60 folded before Flop (didn't bet)
Seat 5: dcfc8308 folded before Flop (didn't bet)
Seat 6: Hero folded on the Turn
```

#### Hand 6353370729 (RETURN, auto big blind)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370729: NLH (₮0.01/₮0.02) 2026/06/08 02:00:59 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: df02d807 (₮3.53 in chips)
Seat 2: 4d211415 (₮2 in chips)
Seat 3: Hero (₮2.14 in chips)
Seat 4: b6c9e914 (₮2 in chips)
Seat 5: 0283366b (₮5.95 in chips)
Seat 6: d258e46c (₮1.40 in chips)
Hero: posts small blind ₮0.01
b6c9e914: posts big blind ₮0.02
d258e46c: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to df02d807
Dealt to 4d211415
Dealt to Hero [Js 8s]
Dealt to b6c9e914
Dealt to 0283366b
Dealt to d258e46c
0283366b: folds
d258e46c: checks
df02d807: folds
4d211415: folds
Hero: calls ₮0.01
b6c9e914: checks
*** FLOP *** [2c Th 4c]
Hero: folds
b6c9e914: checks
d258e46c: checks
*** TURN *** [2c Th 4c] [Kh]
b6c9e914: checks
d258e46c: bets ₮0.04
b6c9e914: folds
d258e46c: RETURN ₮0.04
*** SHOWDOWN ***
d258e46c collected ₮0.06 from pot
*** SUMMARY ***
Total pot ₮0.06 | Rake ₮0
Hand was run once
Board [ 2c Th 4c Kh ]
Game ended: 2026/06/08 02:03:15 CEST
Seat 1: df02d807 folded before Flop (didn't bet)
Seat 2: 4d211415 folded before Flop (didn't bet)
Seat 3: Hero folded on the Flop
Seat 4: b6c9e914 folded on the Turn
Seat 5: 0283366b folded before Flop (didn't bet)
Seat 6: d258e46c won (₮0.06)
```

#### Hand 6343041035 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041035: NLH (₮0.01/₮0.02) 2026/06/08 02:01:10 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: 708c1d3b (₮1.31 in chips)
Seat 3: 419867e2 (₮2.26 in chips)
Seat 4: 28788160 (₮2.30 in chips)
Seat 5: d37e822f (₮2 in chips)
Seat 6: Hero (₮2.30 in chips)
708c1d3b: posts small blind ₮0.01
419867e2: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 708c1d3b
Dealt to 419867e2
Dealt to 28788160
Dealt to d37e822f
Dealt to Hero [8s 6d]
28788160: folds
d37e822f: raises ₮0.02 to ₮0.04
Hero: folds
708c1d3b: folds
419867e2: calls ₮0.02
*** FLOP *** [As Th 2d]
419867e2: checks
d37e822f: bets ₮0.03
419867e2: calls ₮0.03
*** TURN *** [As Th 2d] [Ks]
419867e2: checks
d37e822f: checks
*** RIVER *** [As Th 2d Ks] [9h]
419867e2: bets ₮0.13
d37e822f: folds
419867e2: RETURN ₮0.13
*** SHOWDOWN ***
419867e2 collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0.01
Hand was run once
Board [ As Th 2d Ks 9h ]
Game ended: 2026/06/08 02:02:14 CEST
Seat 1: 708c1d3b folded before Flop (didn't bet)
Seat 3: 419867e2 won (₮0.14)
Seat 4: 28788160 folded before Flop (didn't bet)
Seat 5: d37e822f folded on the River
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6343041036 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041036: NLH (₮0.01/₮0.02) 2026/06/08 02:02:19 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 24db1159 (₮1.30 in chips)
Seat 3: 1c9bc4f8 (₮2.33 in chips)
Seat 4: c6351aeb (₮2.30 in chips)
Seat 5: 62071763 (₮2 in chips)
Seat 6: Hero (₮2.30 in chips)
1c9bc4f8: posts small blind ₮0.01
c6351aeb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 24db1159
Dealt to 1c9bc4f8
Dealt to c6351aeb
Dealt to 62071763
Dealt to Hero [8h 2h]
62071763: raises ₮0.02 to ₮0.04
Hero: folds
24db1159: folds
1c9bc4f8: folds
c6351aeb: folds
62071763: RETURN ₮0.02
*** SHOWDOWN ***
62071763 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 02:02:33 CEST
Seat 1: 24db1159 folded before Flop (didn't bet)
Seat 3: 1c9bc4f8 folded before Flop (didn't bet)
Seat 4: c6351aeb folded before Flop (didn't bet)
Seat 5: 62071763 won (₮0.05)
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6343041037 (ALLIN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041037: NLH (₮0.01/₮0.02) 2026/06/08 02:02:38 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 35d55303 (₮1.30 in chips)
Seat 3: 91018384 (₮2.32 in chips)
Seat 4: 50cf418d (₮2.28 in chips)
Seat 5: a9ee4a25 (₮2.03 in chips)
Seat 6: Hero (₮2.30 in chips)
50cf418d: posts small blind ₮0.01
a9ee4a25: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 35d55303
Dealt to 91018384
Dealt to 50cf418d
Dealt to a9ee4a25
Dealt to Hero [Kh Td]
Hero: folds
35d55303: raises ₮0.03 to ₮0.05
91018384: calls ₮0.05
50cf418d: calls ₮0.04
a9ee4a25: calls ₮0.03
*** FLOP *** [6d 3h 8d]
50cf418d: checks
a9ee4a25: checks
35d55303: checks
91018384: bets ₮0.05
50cf418d: calls ₮0.05
a9ee4a25: folds
35d55303: folds
*** TURN *** [6d 3h 8d] [Ad]
50cf418d: checks
91018384: bets ₮0.24
50cf418d: calls ₮0.24
*** RIVER *** [6d 3h 8d Ad] [7s]
50cf418d: ALLIN ₮1.94
91018384: calls ₮1.94
*** SHOWDOWN ***
91018384: shows [6s 6c] (Three Of A Kind)
91018384 collected ₮4.46 from pot
50cf418d: shows [Qh Jd] (High Card)
*** SUMMARY ***
Total pot ₮4.66 | Rake ₮0.20
Hand was run once
Board [ 6d 3h 8d Ad 7s ]
Game ended: 2026/06/08 02:03:50 CEST
Seat 1: 35d55303 folded on the Flop
Seat 3: 91018384 showed [6s 6c] and won (₮4.46) with Three Of A Kind
Seat 4: 50cf418d showed [Qh Jd] and lost with High Card
Seat 5: a9ee4a25 folded on the Flop
Seat 6: Hero folded before Flop (didn't bet)
```

#### Hand 6353370730 (RETURN)

Expected Hero result: 0.03; Current parser result: 0.03; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370730: NLH (₮0.01/₮0.02) 2026/06/08 02:03:20 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 0194a5e5 (₮3.53 in chips)
Seat 2: 9f855362 (₮2 in chips)
Seat 3: Hero (₮2.12 in chips)
Seat 5: e3dd288d (₮5.95 in chips)
Seat 6: 3ee69752 (₮1.44 in chips)
e3dd288d: posts small blind ₮0.01
3ee69752: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 0194a5e5
Dealt to 9f855362
Dealt to Hero [Qh 7h]
Dealt to e3dd288d
Dealt to 3ee69752
0194a5e5: folds
9f855362: folds
Hero: raises ₮0.03 to ₮0.05
e3dd288d: folds
3ee69752: folds
Hero: RETURN ₮0.03
*** SHOWDOWN ***
Hero collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 02:03:39 CEST
Seat 1: 0194a5e5 folded before Flop (didn't bet)
Seat 2: 9f855362 folded before Flop (didn't bet)
Seat 3: Hero showed [Qh 7h] and won (₮0.05)
Seat 5: e3dd288d folded before Flop (didn't bet)
Seat 6: 3ee69752 folded before Flop (didn't bet)
```

#### Hand 6353370731 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370731: NLH (₮0.01/₮0.02) 2026/06/08 02:03:44 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: 64137e1d (₮3.53 in chips)
Seat 2: d91207ee (₮2 in chips)
Seat 3: Hero (₮2.15 in chips)
Seat 5: 3369d4cf (₮5.94 in chips)
Seat 6: 5ddbbbcc (₮1.42 in chips)
5ddbbbcc: posts small blind ₮0.01
64137e1d: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 64137e1d
Dealt to d91207ee
Dealt to Hero [Kd 4c]
Dealt to 3369d4cf
Dealt to 5ddbbbcc
d91207ee: folds
Hero: folds
3369d4cf: folds
5ddbbbcc: calls ₮0.01
64137e1d: checks
*** FLOP *** [6c Ac Qd]
5ddbbbcc: checks
64137e1d: checks
*** TURN *** [6c Ac Qd] [2d]
5ddbbbcc: checks
64137e1d: checks
*** RIVER *** [6c Ac Qd 2d] [5c]
5ddbbbcc: checks
64137e1d: bets ₮0.03
5ddbbbcc: folds
64137e1d: RETURN ₮0.03
*** SHOWDOWN ***
64137e1d collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [ 6c Ac Qd 2d 5c ]
Game ended: 2026/06/08 02:04:27 CEST
Seat 1: 64137e1d won (₮0.04)
Seat 2: d91207ee folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 5: 3369d4cf folded before Flop (didn't bet)
Seat 6: 5ddbbbcc folded on the River
```

#### Hand 6343041038 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #6343041038: NLH (₮0.01/₮0.02) 2026/06/08 02:03:56 CEST
Table '200588' 6-max Seat #5 is the button
Seat 6: Hero (₮2.30 in chips)
Seat 1: 30a9cfc6 (₮1.25 in chips)
Seat 3: 792d8385 (₮4.50 in chips)
Seat 5: 28a8e7df (₮2 in chips)
Hero: posts small blind ₮0.01
30a9cfc6: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ts 2h]
Dealt to 30a9cfc6
Dealt to 792d8385
Dealt to 28a8e7df
792d8385: folds
28a8e7df: folds
Hero: folds
30a9cfc6: RETURN ₮0.01
*** SHOWDOWN ***
30a9cfc6 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 02:04:04 CEST
Seat 6: Hero folded before Flop (didn't bet)
Seat 1: 30a9cfc6 won (₮0.02)
Seat 3: 792d8385 folded before Flop (didn't bet)
Seat 5: 28a8e7df folded before Flop (didn't bet)
```

#### Hand 6353370732 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370732: NLH (₮0.01/₮0.02) 2026/06/08 02:04:32 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: 080f7489 (₮3.55 in chips)
Seat 2: bdb8eb6e (₮2 in chips)
Seat 3: Hero (₮2.15 in chips)
Seat 5: d3032ebc (₮5.94 in chips)
Seat 6: 0b51c7d1 (₮1.40 in chips)
080f7489: posts small blind ₮0.01
bdb8eb6e: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 080f7489
Dealt to bdb8eb6e
Dealt to Hero [5h 4d]
Dealt to d3032ebc
Dealt to 0b51c7d1
Hero: folds
d3032ebc: folds
0b51c7d1: folds
080f7489: raises ₮0.02 to ₮0.04
bdb8eb6e: folds
080f7489: RETURN ₮0.02
*** SHOWDOWN ***
080f7489 collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 02:04:56 CEST
Seat 1: 080f7489 won (₮0.04)
Seat 2: bdb8eb6e folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 5: d3032ebc folded before Flop (didn't bet)
Seat 6: 0b51c7d1 folded before Flop (didn't bet)
```

#### Hand 6353370733 (RETURN)

Expected Hero result: 0.15; Current parser result: 0.15; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370733: NLH (₮0.01/₮0.02) 2026/06/08 02:05:01 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: b6bb7e5e (₮3.57 in chips)
Seat 2: d28c50bb (₮2 in chips)
Seat 3: Hero (₮2.15 in chips)
Seat 5: 84434e78 (₮5.94 in chips)
Seat 6: 4a9052f6 (₮1.40 in chips)
d28c50bb: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to b6bb7e5e
Dealt to d28c50bb
Dealt to Hero [As 5s]
Dealt to 84434e78
Dealt to 4a9052f6
84434e78: folds
4a9052f6: calls ₮0.02
b6bb7e5e: folds
d28c50bb: raises ₮0.06 to ₮0.08
Hero: calls ₮0.06
4a9052f6: calls ₮0.06
*** FLOP *** [8c Ts 8d]
d28c50bb: checks
Hero: checks
4a9052f6: checks
*** TURN *** [8c Ts 8d] [9h]
d28c50bb: checks
Hero: bets ₮0.12
4a9052f6: folds
d28c50bb: folds
Hero: RETURN ₮0.12
*** SHOWDOWN ***
Hero collected ₮0.23 from pot
*** SUMMARY ***
Total pot ₮0.24 | Rake ₮0.01
Hand was run once
Board [ 8c Ts 8d 9h ]
Game ended: 2026/06/08 02:06:14 CEST
Seat 1: b6bb7e5e folded before Flop (didn't bet)
Seat 2: d28c50bb folded on the Turn
Seat 3: Hero showed [As 5s] and won (₮0.23)
Seat 5: 84434e78 folded before Flop (didn't bet)
Seat 6: 4a9052f6 folded on the Turn
```

#### Hand 6353370734 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370734: NLH (₮0.01/₮0.02) 2026/06/08 02:06:19 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 2303cd1c (₮3.57 in chips)
Seat 2: eb313c10 (₮2 in chips)
Seat 3: Hero (₮2.30 in chips)
Seat 5: 6fe515b9 (₮5.94 in chips)
Seat 6: 198922d2 (₮1.32 in chips)
Hero: posts small blind ₮0.01
6fe515b9: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 2303cd1c
Dealt to eb313c10
Dealt to Hero [Qs 6h]
Dealt to 6fe515b9
Dealt to 198922d2
198922d2: calls ₮0.02
2303cd1c: folds
eb313c10: calls ₮0.02
Hero: calls ₮0.01
6fe515b9: checks
*** FLOP *** [4s 3h Ts]
Hero: folds
6fe515b9: bets ₮0.04
198922d2: folds
eb313c10: calls ₮0.04
*** TURN *** [4s 3h Ts] [As]
6fe515b9: checks
eb313c10: bets ₮0.08
6fe515b9: folds
eb313c10: RETURN ₮0.08
*** SHOWDOWN ***
eb313c10 collected ₮0.15 from pot
*** SUMMARY ***
Total pot ₮0.16 | Rake ₮0.01
Hand was run once
Board [ 4s 3h Ts As ]
Game ended: 2026/06/08 02:07:19 CEST
Seat 1: 2303cd1c folded before Flop (didn't bet)
Seat 2: eb313c10 won (₮0.15)
Seat 3: Hero folded on the Flop
Seat 5: 6fe515b9 folded on the Turn
Seat 6: 198922d2 folded on the Flop
```

#### Hand 6353370735 (RETURN)

Expected Hero result: 0.11; Current parser result: 0.11; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370735: NLH (₮0.01/₮0.02) 2026/06/08 02:07:24 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: 42baeecf (₮3.57 in chips)
Seat 2: c6fe90de (₮2.09 in chips)
Seat 3: Hero (₮2.28 in chips)
Seat 5: 5325a065 (₮5.88 in chips)
Seat 6: d8d2bf2e (₮1.30 in chips)
5325a065: posts small blind ₮0.01
d8d2bf2e: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 42baeecf
Dealt to c6fe90de
Dealt to Hero [5c 4c]
Dealt to 5325a065
Dealt to d8d2bf2e
42baeecf: raises ₮0.03 to ₮0.05
c6fe90de: folds
Hero: calls ₮0.05
5325a065: folds
d8d2bf2e: folds
*** FLOP *** [9d Qs 6h]
42baeecf: checks
Hero: checks
*** TURN *** [9d Qs 6h] [3s]
42baeecf: bets ₮0.04
Hero: calls ₮0.04
*** RIVER *** [9d Qs 6h 3s] [6c]
42baeecf: checks
Hero: bets ₮0.13
42baeecf: folds
Hero: RETURN ₮0.13
*** SHOWDOWN ***
Hero collected ₮0.20 from pot
*** SUMMARY ***
Total pot ₮0.21 | Rake ₮0.01
Hand was run once
Board [ 9d Qs 6h 3s 6c ]
Game ended: 2026/06/08 02:08:35 CEST
Seat 1: 42baeecf folded on the River
Seat 2: c6fe90de folded before Flop (didn't bet)
Seat 3: Hero showed [5c 4c] and won (₮0.20)
Seat 5: 5325a065 folded before Flop (didn't bet)
Seat 6: d8d2bf2e folded before Flop (didn't bet)
```

#### Hand 6353370737 (auto big blind)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #6353370737: NLH (₮0.01/₮0.02) 2026/06/08 02:09:47 CEST
Table '200588' 6-max Seat #6 is the button
Seat 3: Hero (₮2.89 in chips)
Seat 1: 1a0f5b98 (₮3.43 in chips)
Seat 2: 34904748 (₮2.09 in chips)
Seat 4: aecb9dad (₮2 in chips)
Seat 5: c5dd1bbe (₮5.82 in chips)
Seat 6: ccbb8031 (₮0.83 in chips)
1a0f5b98: posts small blind ₮0.01
34904748: posts big blind ₮0.02
aecb9dad: posts auto big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ad 2c]
Dealt to 1a0f5b98
Dealt to 34904748
Dealt to aecb9dad
Dealt to c5dd1bbe
Dealt to ccbb8031
Hero: folds
aecb9dad: checks
c5dd1bbe: raises ₮0.05 to ₮0.07
ccbb8031: calls ₮0.07
1a0f5b98: calls ₮0.06
34904748: folds
aecb9dad: folds
*** FLOP *** [6h Qs Kc]
1a0f5b98: checks
c5dd1bbe: checks
ccbb8031: checks
*** TURN *** [6h Qs Kc] [3h]
1a0f5b98: checks
c5dd1bbe: checks
ccbb8031: checks
*** RIVER *** [6h Qs Kc 3h] [Kh]
1a0f5b98: checks
c5dd1bbe: checks
ccbb8031: checks
*** SHOWDOWN ***
c5dd1bbe: shows [Td Ts] (Two Pair)
c5dd1bbe collected ₮0.24 from pot
1a0f5b98: shows [6c 4c] (Two Pair)
ccbb8031: mucks hand
*** SUMMARY ***
Total pot ₮0.25 | Rake ₮0.01
Hand was run once
Board [ 6h Qs Kc 3h Kh ]
Game ended: 2026/06/08 02:10:41 CEST
Seat 3: Hero folded before Flop (didn't bet)
Seat 1: 1a0f5b98 showed [6c 4c] and lost with Two Pair
Seat 2: 34904748 folded before Flop (didn't bet)
Seat 4: aecb9dad folded before Flop (didn't bet)
Seat 5: c5dd1bbe showed [Td Ts] and won (₮0.24) with Two Pair
Seat 6: ccbb8031 didn't show
```

#### Hand 804490002 (RETURN)

Expected Hero result: 0.04; Current parser result: 0.04; Discrepancy: 0.00.

```text
CoinPoker Hand #804490002: NLH (₮0.10/₮0.25) 2026/06/08 02:15:22 CEST
Table '100166' 4-max Seat #2 is the button
Seat 3: Hero (₮2 in chips)
Seat 2: dd65251a (₮2 in chips)
dd65251a: posts small blind ₮0.10
Hero: posts big blind ₮0.25
*** HOLE CARDS ***
Dealt to Hero [Qc 2d]
Dealt to dd65251a
dd65251a: folds
Hero: RETURN ₮0.15
*** SHOWDOWN ***
Hero collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.20 | Rake ₮0.04 | Splash Fee ₮0.02
Hand was run once
Board [  ]
Game ended: 2026/06/08 02:15:49 CEST
Seat 3: Hero showed [Qc 2d] and won (₮0.14)
Seat 2: dd65251a folded before Flop (didn't bet)
```

#### Hand 64114500383 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500383: NLH (₮0.01/₮0.02) 2026/06/08 21:01:25 CEST
Table '200829' 6-max Seat #5 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: e8913ce0 (₮2.38 in chips)
Seat 3: 6cc4d058 (₮1.57 in chips)
Seat 4: 88a15bbd (₮2.16 in chips)
Seat 5: 0fb94459 (₮2.26 in chips)
Seat 6: 8e8c9939 (₮1.24 in chips)
8e8c9939: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [4d 2s]
Dealt to e8913ce0
Dealt to 6cc4d058
Dealt to 88a15bbd
Dealt to 0fb94459
Dealt to 8e8c9939
e8913ce0: folds
6cc4d058: raises ₮0.06 to ₮0.08
88a15bbd: folds
0fb94459: folds
8e8c9939: folds
Hero: folds
6cc4d058: RETURN ₮0.06
*** SHOWDOWN ***
6cc4d058 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:02:02 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 2: e8913ce0 folded before Flop (didn't bet)
Seat 3: 6cc4d058 won (₮0.05)
Seat 4: 88a15bbd folded before Flop (didn't bet)
Seat 5: 0fb94459 folded before Flop (didn't bet)
Seat 6: 8e8c9939 folded before Flop (didn't bet)
```

#### Hand 64312100123 (RETURN)

Expected Hero result: 0.02; Current parser result: 0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100123: NLH (₮0.01/₮0.02) 2026/06/08 21:01:35 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 19f76631 (₮1.17 in chips)
Seat 2: 27854266 (₮0.83 in chips)
Seat 3: Hero (₮1.84 in chips)
Seat 4: 64726468 (₮1 in chips)
Seat 5: 99b1b1f6 (₮2.20 in chips)
Seat 6: ef1ae2aa (₮2 in chips)
Hero: posts small blind ₮0.01
64726468: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 19f76631
Dealt to 27854266
Dealt to Hero [As 9d]
Dealt to 64726468
Dealt to 99b1b1f6
Dealt to ef1ae2aa
99b1b1f6: folds
ef1ae2aa: folds
19f76631: folds
27854266: folds
Hero: raises ₮0.03 to ₮0.05
64726468: folds
Hero: RETURN ₮0.03
*** SHOWDOWN ***
Hero collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:02:11 CEST
Seat 1: 19f76631 folded before Flop (didn't bet)
Seat 2: 27854266 folded before Flop (didn't bet)
Seat 3: Hero showed [As 9d] and won (₮0.04)
Seat 4: 64726468 folded before Flop (didn't bet)
Seat 5: 99b1b1f6 folded before Flop (didn't bet)
Seat 6: ef1ae2aa folded before Flop (didn't bet)
```

#### Hand 64114500384 (RETURN)

Expected Hero result: -0.06; Current parser result: -0.06; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500384: NLH (₮0.01/₮0.02) 2026/06/08 21:02:07 CEST
Table '200829' 6-max Seat #6 is the button
Seat 1: Hero (₮1.98 in chips)
Seat 2: 955b29c4 (₮2.38 in chips)
Seat 3: feacff6b (₮1.60 in chips)
Seat 4: 3063e13a (₮2.16 in chips)
Seat 5: 56264cd7 (₮2.26 in chips)
Seat 6: f32d3c29 (₮1.23 in chips)
Hero: posts small blind ₮0.01
955b29c4: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Kc Th]
Dealt to 955b29c4
Dealt to feacff6b
Dealt to 3063e13a
Dealt to 56264cd7
Dealt to f32d3c29
feacff6b: folds
3063e13a: folds
56264cd7: raises ₮0.04 to ₮0.06
f32d3c29: calls ₮0.06
Hero: calls ₮0.05
955b29c4: folds
*** FLOP *** [2d 7d 2s]
Hero: checks
56264cd7: checks
f32d3c29: bets ₮0.15
Hero: folds
56264cd7: calls ₮0.15
*** TURN *** [2d 7d 2s] [8h]
56264cd7: checks
f32d3c29: bets ₮0.25
56264cd7: folds
f32d3c29: RETURN ₮0.25
*** SHOWDOWN ***
f32d3c29 collected ₮0.48 from pot
*** SUMMARY ***
Total pot ₮0.50 | Rake ₮0.02
Hand was run once
Board [ 2d 7d 2s 8h ]
Game ended: 2026/06/08 21:03:14 CEST
Seat 1: Hero folded on the Flop
Seat 2: 955b29c4 folded before Flop (didn't bet)
Seat 3: feacff6b folded before Flop (didn't bet)
Seat 4: 3063e13a folded before Flop (didn't bet)
Seat 5: 56264cd7 folded on the Turn
Seat 6: f32d3c29 won (₮0.48)
```

#### Hand 64312100124 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100124: NLH (₮0.01/₮0.02) 2026/06/08 21:02:16 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: b1084596 (₮1.17 in chips)
Seat 2: 91e5cb2c (₮0.83 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: d30c1ed5 (₮0.98 in chips)
Seat 5: a14e7139 (₮2.20 in chips)
Seat 6: d7b6a0f7 (₮2 in chips)
d30c1ed5: posts small blind ₮0.01
a14e7139: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to b1084596
Dealt to 91e5cb2c
Dealt to Hero [Js 7h]
Dealt to d30c1ed5
Dealt to a14e7139
Dealt to d7b6a0f7
d7b6a0f7: folds
b1084596: folds
91e5cb2c: folds
Hero: folds
d30c1ed5: folds
a14e7139: RETURN ₮0.01
*** SHOWDOWN ***
a14e7139 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:02:30 CEST
Seat 1: b1084596 folded before Flop (didn't bet)
Seat 2: 91e5cb2c folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: d30c1ed5 folded before Flop (didn't bet)
Seat 5: a14e7139 won (₮0.02)
Seat 6: d7b6a0f7 folded before Flop (didn't bet)
```

#### Hand 64312100125 (RETURN)

Expected Hero result: -0.07; Current parser result: -0.07; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100125: NLH (₮0.01/₮0.02) 2026/06/08 21:02:35 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: 49164e8a (₮1.17 in chips)
Seat 2: 2f8f6043 (₮0.83 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: bd0ae07a (₮0.97 in chips)
Seat 5: e411cef5 (₮2.21 in chips)
Seat 6: 05e87137 (₮2 in chips)
e411cef5: posts small blind ₮0.01
05e87137: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 49164e8a
Dealt to 2f8f6043
Dealt to Hero [As 2s]
Dealt to bd0ae07a
Dealt to e411cef5
Dealt to 05e87137
49164e8a: folds
2f8f6043: calls ₮0.02
Hero: raises ₮0.05 to ₮0.07
bd0ae07a: folds
e411cef5: folds
05e87137: raises ₮0.25 to ₮0.32
2f8f6043: folds
Hero: folds
05e87137: RETURN ₮0.25
*** SHOWDOWN ***
05e87137 collected ₮0.17 from pot
*** SUMMARY ***
Total pot ₮0.17 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:03:09 CEST
Seat 1: 49164e8a folded before Flop (didn't bet)
Seat 2: 2f8f6043 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: bd0ae07a folded before Flop (didn't bet)
Seat 5: e411cef5 folded before Flop (didn't bet)
Seat 6: 05e87137 won (₮0.17)
```

#### Hand 64312100126 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100126: NLH (₮0.01/₮0.02) 2026/06/08 21:03:14 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: 41140d7d (₮1.17 in chips)
Seat 2: 30be5b35 (₮0.81 in chips)
Seat 3: Hero (₮1.93 in chips)
Seat 4: 964b1d85 (₮0.97 in chips)
Seat 5: 3d229751 (₮2.20 in chips)
Seat 6: a13616f9 (₮2.10 in chips)
a13616f9: posts small blind ₮0.01
41140d7d: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 41140d7d
Dealt to 30be5b35
Dealt to Hero [6d 4h]
Dealt to 964b1d85
Dealt to 3d229751
Dealt to a13616f9
30be5b35: folds
Hero: folds
964b1d85: raises ₮0.04 to ₮0.06
3d229751: folds
a13616f9: raises ₮0.12 to ₮0.18
41140d7d: folds
964b1d85: folds
a13616f9: RETURN ₮0.12
*** SHOWDOWN ***
a13616f9 collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.14 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:03:40 CEST
Seat 1: 41140d7d folded before Flop (didn't bet)
Seat 2: 30be5b35 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 964b1d85 folded before Flop (didn't bet)
Seat 5: 3d229751 folded before Flop (didn't bet)
Seat 6: a13616f9 won (₮0.14)
```

#### Hand 64312100127 (RETURN, SPLASH dropped)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100127: NLH (₮0.01/₮0.02) 2026/06/08 21:03:44 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: ee5c4ea8 (₮1.15 in chips)
Seat 2: dd3dd2ee (₮0.81 in chips)
Seat 3: Hero (₮1.93 in chips)
Seat 4: e94005e6 (₮0.91 in chips)
Seat 5: a4e5fe18 (₮2.20 in chips)
Seat 6: aa7b8779 (₮2.18 in chips)
SPLASH dropped ₮0.10
ee5c4ea8: posts small blind ₮0.01
dd3dd2ee: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to ee5c4ea8
Dealt to dd3dd2ee
Dealt to Hero [9s 8c]
Dealt to e94005e6
Dealt to a4e5fe18
Dealt to aa7b8779
Hero: folds
e94005e6: folds
a4e5fe18: folds
aa7b8779: raises ₮0.04 to ₮0.06
ee5c4ea8: folds
dd3dd2ee: folds
aa7b8779: RETURN ₮0.04
*** SHOWDOWN ***
aa7b8779 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:04:34 CEST
Seat 1: ee5c4ea8 folded before Flop (didn't bet)
Seat 2: dd3dd2ee folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: e94005e6 folded before Flop (didn't bet)
Seat 5: a4e5fe18 folded before Flop (didn't bet)
Seat 6: aa7b8779 won (₮0.05)
```

#### Hand 64312100128 (RETURN)

Expected Hero result: -0.10; Current parser result: -0.10; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100128: NLH (₮0.01/₮0.02) 2026/06/08 21:04:38 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: 32246f25 (₮1.14 in chips)
Seat 2: f4b2d456 (₮0.79 in chips)
Seat 3: Hero (₮1.93 in chips)
Seat 4: 99eb8997 (₮0.91 in chips)
Seat 5: 3f31d435 (₮2.20 in chips)
Seat 6: c16fe885 (₮2.31 in chips)
f4b2d456: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 32246f25
Dealt to f4b2d456
Dealt to Hero [7s 7h]
Dealt to 99eb8997
Dealt to 3f31d435
Dealt to c16fe885
99eb8997: folds
3f31d435: folds
c16fe885: folds
32246f25: folds
f4b2d456: calls ₮0.01
Hero: raises ₮0.03 to ₮0.05
f4b2d456: calls ₮0.03
*** FLOP *** [4c 8h 3h]
f4b2d456: checks
Hero: bets ₮0.05
f4b2d456: raises ₮0.07 to ₮0.12
Hero: folds
f4b2d456: RETURN ₮0.07
*** SHOWDOWN ***
f4b2d456 collected ₮0.19 from pot
*** SUMMARY ***
Total pot ₮0.20 | Rake ₮0.01
Hand was run once
Board [ 4c 8h 3h ]
Game ended: 2026/06/08 21:05:14 CEST
Seat 1: 32246f25 folded before Flop (didn't bet)
Seat 2: f4b2d456 won (₮0.19)
Seat 3: Hero folded on the Flop
Seat 4: 99eb8997 folded before Flop (didn't bet)
Seat 5: 3f31d435 folded before Flop (didn't bet)
Seat 6: c16fe885 folded before Flop (didn't bet)
```

#### Hand 64312100129 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100129: NLH (₮0.01/₮0.02) 2026/06/08 21:05:19 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: bd5e2e7c (₮1.14 in chips)
Seat 2: 76b8abcf (₮0.88 in chips)
Seat 3: Hero (₮1.83 in chips)
Seat 4: dca04bf5 (₮0.91 in chips)
Seat 5: 01348d66 (₮2.20 in chips)
Seat 6: 91b0d7b3 (₮2.31 in chips)
Hero: posts small blind ₮0.01
dca04bf5: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to bd5e2e7c
Dealt to 76b8abcf
Dealt to Hero [9c 7s]
Dealt to dca04bf5
Dealt to 01348d66
Dealt to 91b0d7b3
01348d66: folds
91b0d7b3: folds
bd5e2e7c: raises ₮0.03 to ₮0.05
76b8abcf: folds
Hero: folds
dca04bf5: calls ₮0.03
*** FLOP *** [8c Ks 9d]
dca04bf5: checks
bd5e2e7c: bets ₮0.04
dca04bf5: folds
bd5e2e7c: RETURN ₮0.04
*** SHOWDOWN ***
bd5e2e7c collected ₮0.10 from pot
*** SUMMARY ***
Total pot ₮0.11 | Rake ₮0.01
Hand was run once
Board [ 8c Ks 9d ]
Game ended: 2026/06/08 21:05:58 CEST
Seat 1: bd5e2e7c won (₮0.10)
Seat 2: 76b8abcf folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: dca04bf5 folded on the Flop
Seat 5: 01348d66 folded before Flop (didn't bet)
Seat 6: 91b0d7b3 folded before Flop (didn't bet)
```

#### Hand 64114500387 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500387: NLH (₮0.01/₮0.02) 2026/06/08 21:05:51 CEST
Table '200829' 6-max Seat #3 is the button
Seat 1: Hero (₮1.22 in chips)
Seat 2: 53bd8ff8 (₮2.35 in chips)
Seat 3: d1b48131 (₮2.73 in chips)
Seat 4: 2be51f60 (₮2.14 in chips)
Seat 5: e50d011e (₮2.05 in chips)
Seat 6: 56bdc480 (₮1.43 in chips)
2be51f60: posts small blind ₮0.01
e50d011e: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Jc 3s]
Dealt to 53bd8ff8
Dealt to d1b48131
Dealt to 2be51f60
Dealt to e50d011e
Dealt to 56bdc480
56bdc480: folds
Hero: folds
53bd8ff8: raises ₮0.02 to ₮0.04
d1b48131: folds
2be51f60: folds
e50d011e: calls ₮0.02
*** FLOP *** [6c Ts 9d]
e50d011e: checks
53bd8ff8: bets ₮0.07
e50d011e: folds
53bd8ff8: RETURN ₮0.07
*** SHOWDOWN ***
53bd8ff8 collected ₮0.09 from pot
*** SUMMARY ***
Total pot ₮0.09 | Rake ₮0
Hand was run once
Board [ 6c Ts 9d ]
Game ended: 2026/06/08 21:06:19 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 2: 53bd8ff8 won (₮0.09)
Seat 3: d1b48131 folded before Flop (didn't bet)
Seat 4: 2be51f60 folded before Flop (didn't bet)
Seat 5: e50d011e folded on the Flop
Seat 6: 56bdc480 folded before Flop (didn't bet)
```

#### Hand 64114500388 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500388: NLH (₮0.01/₮0.02) 2026/06/08 21:06:25 CEST
Table '200829' 6-max Seat #4 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: 96abfb06 (₮2.40 in chips)
Seat 3: 9d56a4bd (₮2.73 in chips)
Seat 4: dbf4070b (₮2.13 in chips)
Seat 5: 5eaf3ad2 (₮2.01 in chips)
Seat 6: 60aca899 (₮1.43 in chips)
5eaf3ad2: posts small blind ₮0.01
60aca899: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Th 5s]
Dealt to 96abfb06
Dealt to 9d56a4bd
Dealt to dbf4070b
Dealt to 5eaf3ad2
Dealt to 60aca899
Hero: folds
96abfb06: raises ₮0.04 to ₮0.06
9d56a4bd: folds
dbf4070b: folds
5eaf3ad2: folds
60aca899: folds
96abfb06: RETURN ₮0.04
*** SHOWDOWN ***
96abfb06 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:06:45 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 2: 96abfb06 won (₮0.05)
Seat 3: 9d56a4bd folded before Flop (didn't bet)
Seat 4: dbf4070b folded before Flop (didn't bet)
Seat 5: 5eaf3ad2 folded before Flop (didn't bet)
Seat 6: 60aca899 folded before Flop (didn't bet)
```

#### Hand 64114500389 (RETURN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500389: NLH (₮0.01/₮0.02) 2026/06/08 21:06:51 CEST
Table '200829' 6-max Seat #5 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: 740eda8b (₮2.43 in chips)
Seat 3: ae97decf (₮2.73 in chips)
Seat 4: 0e93cac7 (₮2.13 in chips)
Seat 5: adcc020d (₮2 in chips)
Seat 6: 23048325 (₮1.41 in chips)
23048325: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Ac 6d]
Dealt to 740eda8b
Dealt to ae97decf
Dealt to 0e93cac7
Dealt to adcc020d
Dealt to 23048325
740eda8b: folds
ae97decf: folds
0e93cac7: raises ₮0.04 to ₮0.06
adcc020d: folds
23048325: folds
Hero: folds
0e93cac7: RETURN ₮0.04
*** SHOWDOWN ***
0e93cac7 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:07:12 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 2: 740eda8b folded before Flop (didn't bet)
Seat 3: ae97decf folded before Flop (didn't bet)
Seat 4: 0e93cac7 won (₮0.05)
Seat 5: adcc020d folded before Flop (didn't bet)
Seat 6: 23048325 folded before Flop (didn't bet)
```

#### Hand 64312100131 (RETURN)

Expected Hero result: 0.03; Current parser result: 0.03; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100131: NLH (₮0.01/₮0.02) 2026/06/08 21:07:10 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: e66e11ac (₮1.19 in chips)
Seat 2: 841616a4 (₮0.61 in chips)
Seat 3: Hero (₮2.09 in chips)
Seat 4: ef77c2bc (₮0.85 in chips)
Seat 5: 7b04ace0 (₮2.18 in chips)
Seat 6: 5f4f16c2 (₮2.31 in chips)
7b04ace0: posts small blind ₮0.01
5f4f16c2: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to e66e11ac
Dealt to 841616a4
Dealt to Hero [Ad 8d]
Dealt to ef77c2bc
Dealt to 7b04ace0
Dealt to 5f4f16c2
e66e11ac: folds
841616a4: folds
Hero: raises ₮0.03 to ₮0.05
ef77c2bc: folds
7b04ace0: folds
5f4f16c2: folds
Hero: RETURN ₮0.03
*** SHOWDOWN ***
Hero collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:07:30 CEST
Seat 1: e66e11ac folded before Flop (didn't bet)
Seat 2: 841616a4 folded before Flop (didn't bet)
Seat 3: Hero showed [Ad 8d] and won (₮0.05)
Seat 4: ef77c2bc folded before Flop (didn't bet)
Seat 5: 7b04ace0 folded before Flop (didn't bet)
Seat 6: 5f4f16c2 folded before Flop (didn't bet)
```

#### Hand 64312100132 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100132: NLH (₮0.01/₮0.02) 2026/06/08 21:07:35 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: a9d86624 (₮1.19 in chips)
Seat 2: 3cd5473b (₮0.61 in chips)
Seat 3: Hero (₮2.12 in chips)
Seat 4: 69f10206 (₮0.85 in chips)
Seat 5: e7462de4 (₮2.17 in chips)
Seat 6: 6046f871 (₮2.29 in chips)
6046f871: posts small blind ₮0.01
a9d86624: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to a9d86624
Dealt to 3cd5473b
Dealt to Hero [Jc 3c]
Dealt to 69f10206
Dealt to e7462de4
Dealt to 6046f871
3cd5473b: folds
Hero: folds
69f10206: folds
e7462de4: raises ₮0.03 to ₮0.05
6046f871: folds
a9d86624: folds
e7462de4: RETURN ₮0.03
*** SHOWDOWN ***
e7462de4 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:07:58 CEST
Seat 1: a9d86624 folded before Flop (didn't bet)
Seat 2: 3cd5473b folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: 69f10206 folded before Flop (didn't bet)
Seat 5: e7462de4 won (₮0.05)
Seat 6: 6046f871 folded before Flop (didn't bet)
```

#### Hand 64114500391 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500391: NLH (₮0.01/₮0.02) 2026/06/08 21:07:56 CEST
Table '200829' 6-max Seat #1 is the button
Seat 1: Hero (₮1.97 in chips)
Seat 2: 7a35650c (₮2.38 in chips)
Seat 3: 0fade76b (₮2.73 in chips)
Seat 4: 4166a4f7 (₮2.16 in chips)
Seat 5: dd4c2f8e (₮2.05 in chips)
Seat 6: 0a60e56e (₮1.40 in chips)
7a35650c: posts small blind ₮0.01
0fade76b: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [Qh 9s]
Dealt to 7a35650c
Dealt to 0fade76b
Dealt to 4166a4f7
Dealt to dd4c2f8e
Dealt to 0a60e56e
4166a4f7: folds
dd4c2f8e: raises ₮0.03 to ₮0.05
0a60e56e: folds
Hero: folds
7a35650c: folds
0fade76b: calls ₮0.03
*** FLOP *** [5d Qc 2h]
0fade76b: checks
dd4c2f8e: bets ₮0.14
0fade76b: folds
dd4c2f8e: RETURN ₮0.14
*** SHOWDOWN ***
dd4c2f8e collected ₮0.10 from pot
*** SUMMARY ***
Total pot ₮0.11 | Rake ₮0.01
Hand was run once
Board [ 5d Qc 2h ]
Game ended: 2026/06/08 21:08:21 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 2: 7a35650c folded before Flop (didn't bet)
Seat 3: 0fade76b folded on the Flop
Seat 4: 4166a4f7 folded before Flop (didn't bet)
Seat 5: dd4c2f8e won (₮0.10)
Seat 6: 0a60e56e folded before Flop (didn't bet)
```

#### Hand 64312100133 (RETURN)

Expected Hero result: -0.15; Current parser result: -0.15; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100133: NLH (₮0.01/₮0.02) 2026/06/08 21:08:03 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: d857e78a (₮1.17 in chips)
Seat 2: e5650e35 (₮0.61 in chips)
Seat 3: Hero (₮2.12 in chips)
Seat 4: a0da6ac1 (₮0.85 in chips)
Seat 5: 1c0fc08e (₮2.20 in chips)
Seat 6: 0cfb760a (₮2.28 in chips)
d857e78a: posts small blind ₮0.01
e5650e35: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to d857e78a
Dealt to e5650e35
Dealt to Hero [Kc Qc]
Dealt to a0da6ac1
Dealt to 1c0fc08e
Dealt to 0cfb760a
Hero: raises ₮0.03 to ₮0.05
a0da6ac1: folds
1c0fc08e: raises ₮0.10 to ₮0.15
0cfb760a: folds
d857e78a: folds
e5650e35: folds
Hero: calls ₮0.10
*** FLOP *** [4d Ad 2h]
Hero: checks
1c0fc08e: bets ₮0.13
Hero: folds
1c0fc08e: RETURN ₮0.13
*** SHOWDOWN ***
1c0fc08e collected ₮0.31 from pot
*** SUMMARY ***
Total pot ₮0.33 | Rake ₮0.02
Hand was run once
Board [ 4d Ad 2h ]
Game ended: 2026/06/08 21:08:49 CEST
Seat 1: d857e78a folded before Flop (didn't bet)
Seat 2: e5650e35 folded before Flop (didn't bet)
Seat 3: Hero folded on the Flop
Seat 4: a0da6ac1 folded before Flop (didn't bet)
Seat 5: 1c0fc08e won (₮0.31)
Seat 6: 0cfb760a folded before Flop (didn't bet)
```

#### Hand 64114500392 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500392: NLH (₮0.01/₮0.02) 2026/06/08 21:08:27 CEST
Table '200829' 6-max Seat #2 is the button
Seat 1: Hero (₮1.97 in chips)
Seat 2: 592bf7a7 (₮2.37 in chips)
Seat 3: 75bdd6af (₮2.68 in chips)
Seat 4: 29455a31 (₮2.16 in chips)
Seat 5: c437d679 (₮2.10 in chips)
Seat 6: 18a3e5b8 (₮1.40 in chips)
75bdd6af: posts small blind ₮0.01
29455a31: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [5s 2d]
Dealt to 592bf7a7
Dealt to 75bdd6af
Dealt to 29455a31
Dealt to c437d679
Dealt to 18a3e5b8
c437d679: raises ₮0.04 to ₮0.06
18a3e5b8: folds
Hero: folds
592bf7a7: folds
75bdd6af: folds
29455a31: folds
c437d679: RETURN ₮0.04
*** SHOWDOWN ***
c437d679 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:08:45 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 2: 592bf7a7 folded before Flop (didn't bet)
Seat 3: 75bdd6af folded before Flop (didn't bet)
Seat 4: 29455a31 folded before Flop (didn't bet)
Seat 5: c437d679 won (₮0.05)
Seat 6: 18a3e5b8 folded before Flop (didn't bet)
```

#### Hand 64312100134 (RETURN, ALLIN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100134: NLH (₮0.01/₮0.02) 2026/06/08 21:08:54 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: cfe6075e (₮1.16 in chips)
Seat 2: f571dd81 (₮0.59 in chips)
Seat 3: Hero (₮1.97 in chips)
Seat 4: e15ccd50 (₮0.85 in chips)
Seat 5: 6e6c78c2 (₮2.36 in chips)
Seat 6: 8904ea13 (₮2.28 in chips)
f571dd81: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to cfe6075e
Dealt to f571dd81
Dealt to Hero [6c 5h]
Dealt to e15ccd50
Dealt to 6e6c78c2
Dealt to 8904ea13
e15ccd50: folds
6e6c78c2: folds
8904ea13: folds
cfe6075e: raises ₮0.03 to ₮0.05
f571dd81: ALLIN ₮0.58
Hero: folds
cfe6075e: folds
f571dd81: RETURN ₮0.54
*** SHOWDOWN ***
f571dd81 collected ₮0.12 from pot
*** SUMMARY ***
Total pot ₮0.12 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:09:27 CEST
Seat 1: cfe6075e folded before Flop (didn't bet)
Seat 2: f571dd81 won (₮0.12)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: e15ccd50 folded before Flop (didn't bet)
Seat 5: 6e6c78c2 folded before Flop (didn't bet)
Seat 6: 8904ea13 folded before Flop (didn't bet)
```

#### Hand 64312100135 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100135: NLH (₮0.01/₮0.02) 2026/06/08 21:09:31 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 487e2841 (₮1.11 in chips)
Seat 2: 1d85a124 (₮0.66 in chips)
Seat 3: Hero (₮1.95 in chips)
Seat 4: a310ac4b (₮0.85 in chips)
Seat 5: 4c2c60ad (₮2.36 in chips)
Seat 6: a0b930bf (₮2.28 in chips)
Hero: posts small blind ₮0.01
a310ac4b: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 487e2841
Dealt to 1d85a124
Dealt to Hero [7h 5d]
Dealt to a310ac4b
Dealt to 4c2c60ad
Dealt to a0b930bf
4c2c60ad: folds
a0b930bf: raises ₮0.04 to ₮0.06
487e2841: folds
1d85a124: calls ₮0.06
Hero: folds
a310ac4b: folds
*** FLOP *** [3c Kd 9h]
a0b930bf: checks
1d85a124: checks
*** TURN *** [3c Kd 9h] [8d]
a0b930bf: checks
1d85a124: bets ₮0.08
a0b930bf: folds
1d85a124: RETURN ₮0.08
*** SHOWDOWN ***
1d85a124 collected ₮0.14 from pot
*** SUMMARY ***
Total pot ₮0.15 | Rake ₮0.01
Hand was run once
Board [ 3c Kd 9h 8d ]
Game ended: 2026/06/08 21:10:31 CEST
Seat 1: 487e2841 folded before Flop (didn't bet)
Seat 2: 1d85a124 won (₮0.14)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: a310ac4b folded before Flop (didn't bet)
Seat 5: 4c2c60ad folded before Flop (didn't bet)
Seat 6: a0b930bf folded on the Turn
```

#### Hand 64312100136 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100136: NLH (₮0.01/₮0.02) 2026/06/08 21:10:36 CEST
Table '200588' 6-max Seat #3 is the button
Seat 1: f8c42361 (₮1.11 in chips)
Seat 2: ad6b9837 (₮0.74 in chips)
Seat 3: Hero (₮1.94 in chips)
Seat 4: c1261909 (₮0.83 in chips)
Seat 5: 785ef7c4 (₮2.36 in chips)
Seat 6: 87ed496b (₮2.22 in chips)
c1261909: posts small blind ₮0.01
785ef7c4: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to f8c42361
Dealt to ad6b9837
Dealt to Hero [4s 3c]
Dealt to c1261909
Dealt to 785ef7c4
Dealt to 87ed496b
87ed496b: raises ₮0.03 to ₮0.05
f8c42361: folds
ad6b9837: folds
Hero: folds
c1261909: folds
785ef7c4: folds
87ed496b: RETURN ₮0.03
*** SHOWDOWN ***
87ed496b collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:11:04 CEST
Seat 1: f8c42361 folded before Flop (didn't bet)
Seat 2: ad6b9837 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: c1261909 folded before Flop (didn't bet)
Seat 5: 785ef7c4 folded before Flop (didn't bet)
Seat 6: 87ed496b won (₮0.05)
```

#### Hand 64114500395 (RETURN)

Expected Hero result: 0.01; Current parser result: 0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500395: NLH (₮0.01/₮0.02) 2026/06/08 21:10:38 CEST
Table '200829' 6-max Seat #5 is the button
Seat 2: 289a32b5 (₮2.24 in chips)
Seat 1: Hero (₮2 in chips)
Seat 3: 2a6e7a8c (₮3.16 in chips)
Seat 4: 48b64217 (₮2.13 in chips)
Seat 5: 82c24dcc (₮2.25 in chips)
Seat 6: b479df1a (₮1.38 in chips)
b479df1a: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 289a32b5
Dealt to Hero [7c 3d]
Dealt to 2a6e7a8c
Dealt to 48b64217
Dealt to 82c24dcc
Dealt to b479df1a
289a32b5: folds
2a6e7a8c: folds
48b64217: folds
82c24dcc: folds
b479df1a: folds
Hero: RETURN ₮0.01
*** SHOWDOWN ***
Hero collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:10:53 CEST
Seat 2: 289a32b5 folded before Flop (didn't bet)
Seat 1: Hero showed [7c 3d] and won (₮0.02)
Seat 3: 2a6e7a8c folded before Flop (didn't bet)
Seat 4: 48b64217 folded before Flop (didn't bet)
Seat 5: 82c24dcc folded before Flop (didn't bet)
Seat 6: b479df1a folded before Flop (didn't bet)
```

#### Hand 64312100137 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100137: NLH (₮0.01/₮0.02) 2026/06/08 21:11:09 CEST
Table '200588' 6-max Seat #4 is the button
Seat 1: a8dfbc33 (₮1.11 in chips)
Seat 2: 792a3ce4 (₮0.74 in chips)
Seat 3: Hero (₮1.94 in chips)
Seat 4: ac4744ab (₮0.82 in chips)
Seat 5: d1f1104f (₮2.34 in chips)
Seat 6: 67d0c5d5 (₮2.25 in chips)
d1f1104f: posts small blind ₮0.01
67d0c5d5: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to a8dfbc33
Dealt to 792a3ce4
Dealt to Hero [As 3c]
Dealt to ac4744ab
Dealt to d1f1104f
Dealt to 67d0c5d5
a8dfbc33: folds
792a3ce4: folds
Hero: folds
ac4744ab: folds
d1f1104f: raises ₮0.04 to ₮0.06
67d0c5d5: folds
d1f1104f: RETURN ₮0.04
*** SHOWDOWN ***
d1f1104f collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:11:47 CEST
Seat 1: a8dfbc33 folded before Flop (didn't bet)
Seat 2: 792a3ce4 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: ac4744ab folded before Flop (didn't bet)
Seat 5: d1f1104f won (₮0.04)
Seat 6: 67d0c5d5 folded before Flop (didn't bet)
```

#### Hand 64312100138 (RETURN, ALLIN)

Expected Hero result: -0.74; Current parser result: -0.74; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100138: NLH (₮0.01/₮0.02) 2026/06/08 21:11:52 CEST
Table '200588' 6-max Seat #5 is the button
Seat 1: aba96d92 (₮1.11 in chips)
Seat 2: 6d82507f (₮0.74 in chips)
Seat 3: Hero (₮1.94 in chips)
Seat 4: 4270ccad (₮0.82 in chips)
Seat 5: 0d59e013 (₮2.36 in chips)
Seat 6: 368bfbf9 (₮2.23 in chips)
368bfbf9: posts small blind ₮0.01
aba96d92: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to aba96d92
Dealt to 6d82507f
Dealt to Hero [Js Jh]
Dealt to 4270ccad
Dealt to 0d59e013
Dealt to 368bfbf9
6d82507f: ALLIN ₮0.74
Hero: ALLIN ₮1.94
4270ccad: folds
0d59e013: folds
368bfbf9: folds
aba96d92: folds
Hero: RETURN ₮1.20
*** FLOP *** [5d Ah Kc]
*** TURN *** [5d Ah Kc] [Qh]
*** RIVER *** [5d Ah Kc Qh] [8h]
*** SHOWDOWN ***
6d82507f: shows [Qc 2c] (One Pair)
6d82507f collected ₮1.43 from pot
Hero: shows [Js Jh] (One Pair)
*** SUMMARY ***
Total pot ₮1.51 | Rake ₮0.08
Hand was run once
Board [ 5d Ah Kc Qh 8h ]
Game ended: 2026/06/08 21:12:25 CEST
Seat 1: aba96d92 folded before Flop (didn't bet)
Seat 2: 6d82507f showed [Qc 2c] and won (₮1.43) with One Pair
Seat 3: Hero showed [Js Jh] and lost with One Pair
Seat 4: 4270ccad folded before Flop (didn't bet)
Seat 5: 0d59e013 folded before Flop (didn't bet)
Seat 6: 368bfbf9 folded before Flop (didn't bet)
```

#### Hand 64114500397 (RETURN)

Expected Hero result: 0.25; Current parser result: 0.25; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500397: NLH (₮0.01/₮0.02) 2026/06/08 21:11:55 CEST
Table '200829' 6-max Seat #1 is the button
Seat 1: Hero (₮2 in chips)
Seat 2: 353b5fcf (₮1.98 in chips)
Seat 3: ea3b1cdb (₮3.16 in chips)
Seat 4: a245dddc (₮2.07 in chips)
Seat 5: 6ecbcd73 (₮2.61 in chips)
Seat 6: 89c489bd (₮1.06 in chips)
353b5fcf: posts small blind ₮0.01
ea3b1cdb: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [As 5c]
Dealt to 353b5fcf
Dealt to ea3b1cdb
Dealt to a245dddc
Dealt to 6ecbcd73
Dealt to 89c489bd
a245dddc: folds
6ecbcd73: folds
89c489bd: folds
Hero: raises ₮0.03 to ₮0.05
353b5fcf: calls ₮0.04
ea3b1cdb: calls ₮0.03
*** FLOP *** [9d 3d 6c]
353b5fcf: checks
ea3b1cdb: checks
Hero: checks
*** TURN *** [9d 3d 6c] [4s]
353b5fcf: bets ₮0.05
ea3b1cdb: folds
Hero: calls ₮0.05
*** RIVER *** [9d 3d 6c 4s] [2d]
353b5fcf: bets ₮0.12
Hero: raises ₮0.16 to ₮0.28
353b5fcf: folds
Hero: RETURN ₮0.16
*** SHOWDOWN ***
Hero collected ₮0.47 from pot
*** SUMMARY ***
Total pot ₮0.49 | Rake ₮0.02
Hand was run once
Board [ 9d 3d 6c 4s 2d ]
Game ended: 2026/06/08 21:13:14 CEST
Seat 1: Hero showed [As 5c] and won (₮0.47)
Seat 2: 353b5fcf folded on the River
Seat 3: ea3b1cdb folded on the Turn
Seat 4: a245dddc folded before Flop (didn't bet)
Seat 5: 6ecbcd73 folded before Flop (didn't bet)
Seat 6: 89c489bd folded before Flop (didn't bet)
```

#### Hand 64312100139 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100139: NLH (₮0.01/₮0.02) 2026/06/08 21:12:31 CEST
Table '200588' 6-max Seat #6 is the button
Seat 1: b2f28162 (₮1.09 in chips)
Seat 2: f5898022 (₮1.43 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: e309ebfd (₮0.82 in chips)
Seat 5: bbbd1c35 (₮2.36 in chips)
Seat 6: 6284c64a (₮2.22 in chips)
b2f28162: posts small blind ₮0.01
f5898022: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to b2f28162
Dealt to f5898022
Dealt to Hero [Qd 5c]
Dealt to e309ebfd
Dealt to bbbd1c35
Dealt to 6284c64a
Hero: folds
e309ebfd: folds
bbbd1c35: folds
6284c64a: folds
b2f28162: folds
f5898022: RETURN ₮0.01
*** SHOWDOWN ***
f5898022 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:12:49 CEST
Seat 1: b2f28162 folded before Flop (didn't bet)
Seat 2: f5898022 won (₮0.02)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: e309ebfd folded before Flop (didn't bet)
Seat 5: bbbd1c35 folded before Flop (didn't bet)
Seat 6: 6284c64a folded before Flop (didn't bet)
```

#### Hand 64312100140 (RETURN, ALLIN)

Expected Hero result: -0.02; Current parser result: -0.02; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100140: NLH (₮0.01/₮0.02) 2026/06/08 21:12:54 CEST
Table '200588' 6-max Seat #1 is the button
Seat 1: e4a5ae4d (₮1.08 in chips)
Seat 2: b1afcc0f (₮1.44 in chips)
Seat 3: Hero (₮2 in chips)
Seat 4: ccda72f9 (₮0.82 in chips)
Seat 5: b82601f7 (₮2.36 in chips)
Seat 6: 23d6c0b9 (₮2.22 in chips)
b1afcc0f: posts small blind ₮0.01
Hero: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to e4a5ae4d
Dealt to b1afcc0f
Dealt to Hero [Jc 8s]
Dealt to ccda72f9
Dealt to b82601f7
Dealt to 23d6c0b9
ccda72f9: folds
b82601f7: folds
23d6c0b9: folds
e4a5ae4d: folds
b1afcc0f: ALLIN ₮1.43
Hero: folds
b1afcc0f: RETURN ₮1.42
*** SHOWDOWN ***
b1afcc0f collected ₮0.04 from pot
*** SUMMARY ***
Total pot ₮0.04 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:13:19 CEST
Seat 1: e4a5ae4d folded before Flop (didn't bet)
Seat 2: b1afcc0f won (₮0.04)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: ccda72f9 folded before Flop (didn't bet)
Seat 5: b82601f7 folded before Flop (didn't bet)
Seat 6: 23d6c0b9 folded before Flop (didn't bet)
```

#### Hand 64114500398 (RETURN)

Expected Hero result: 0.00; Current parser result: 0.00; Discrepancy: 0.00.

```text
CoinPoker Hand #64114500398: NLH (₮0.01/₮0.02) 2026/06/08 21:13:20 CEST
Table '200829' 6-max Seat #2 is the button
Seat 1: Hero (₮2.25 in chips)
Seat 2: af6e4313 (₮1.76 in chips)
Seat 3: 36f12578 (₮3.11 in chips)
Seat 4: a5d93825 (₮2.07 in chips)
Seat 5: d06e5f3b (₮2.61 in chips)
Seat 6: 509968a1 (₮1.06 in chips)
36f12578: posts small blind ₮0.01
a5d93825: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to Hero [6d 2s]
Dealt to af6e4313
Dealt to 36f12578
Dealt to a5d93825
Dealt to d06e5f3b
Dealt to 509968a1
d06e5f3b: folds
509968a1: folds
Hero: folds
af6e4313: folds
36f12578: folds
a5d93825: RETURN ₮0.01
*** SHOWDOWN ***
a5d93825 collected ₮0.02 from pot
*** SUMMARY ***
Total pot ₮0.02 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:13:39 CEST
Seat 1: Hero folded before Flop (didn't bet)
Seat 2: af6e4313 folded before Flop (didn't bet)
Seat 3: 36f12578 folded before Flop (didn't bet)
Seat 4: a5d93825 won (₮0.02)
Seat 5: d06e5f3b folded before Flop (didn't bet)
Seat 6: 509968a1 folded before Flop (didn't bet)
```

#### Hand 64312100141 (RETURN)

Expected Hero result: -0.01; Current parser result: -0.01; Discrepancy: 0.00.

```text
CoinPoker Hand #64312100141: NLH (₮0.01/₮0.02) 2026/06/08 21:13:24 CEST
Table '200588' 6-max Seat #2 is the button
Seat 1: 22e80ddb (₮1.08 in chips)
Seat 2: 0fa7d9c0 (₮1.46 in chips)
Seat 3: Hero (₮1.98 in chips)
Seat 4: d9b1724a (₮0.82 in chips)
Seat 5: 89df4054 (₮2.36 in chips)
Seat 6: af99e00c (₮2.22 in chips)
Hero: posts small blind ₮0.01
d9b1724a: posts big blind ₮0.02
*** HOLE CARDS ***
Dealt to 22e80ddb
Dealt to 0fa7d9c0
Dealt to Hero [Kc 5h]
Dealt to d9b1724a
Dealt to 89df4054
Dealt to af99e00c
89df4054: raises ₮0.02 to ₮0.04
af99e00c: folds
22e80ddb: folds
0fa7d9c0: folds
Hero: folds
d9b1724a: folds
89df4054: RETURN ₮0.02
*** SHOWDOWN ***
89df4054 collected ₮0.05 from pot
*** SUMMARY ***
Total pot ₮0.05 | Rake ₮0
Hand was run once
Board [  ]
Game ended: 2026/06/08 21:13:36 CEST
Seat 1: 22e80ddb folded before Flop (didn't bet)
Seat 2: 0fa7d9c0 folded before Flop (didn't bet)
Seat 3: Hero folded before Flop (didn't bet)
Seat 4: d9b1724a folded before Flop (didn't bet)
Seat 5: 89df4054 won (₮0.05)
Seat 6: af99e00c folded before Flop (didn't bet)
```

## Suggested Fixes

1. Parser hand count: no fix is required for standard V1 NLH cash hands. If BombPot should be included, add explicit `NLH BombPot` support as a separate variant instead of loosening the standard header regex.
2. WTSD/W$SD: no bug is proven by this file. Current WTSD/W$SD exactly match raw `*** SHOWDOWN ***` validation. For future robustness, consider storing an explicit `showdownMarkerSeen` signal so stats do not have to infer showdown semantics from `collect`/summary data.
3. CBet Flop: proven issue. Hand `64312100138` is all-in preflop, has a dealt flop, but no possible flop decision. Current stats count it as a CBet opportunity because Hero was last preflop aggressor and a flop board exists. Minimal fix: exclude hands with no flop action or no postflop decision possibility from CBet opportunity counts.
4. HeroNet: no parser-vs-independent discrepancies were found in the special-hand action audit. Keep RETURN as refund against contributed chips, not standalone profit.

## Confidence Levels

| Statistic                      | Confidence                              | Reason                                                                                                                           |
| ------------------------------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Parsed standard NLH hand count | High                                    | All exact `NLH (SB/BB)` blocks parse; only PLO and BombPot are skipped.                                                          |
| VPIP                           | High                                    | Per-hand voluntary preflop actions reconcile with current output.                                                                |
| PFR                            | High                                    | Per-hand Hero preflop raise/all-in actions reconcile with current output.                                                        |
| 3Bet                           | Medium-High                             | Counts reconcile with current logic; denominator definition is narrow but explicit.                                              |
| Fold to 3Bet                   | Medium-High                             | Counts reconcile with current logic; rare spots need larger fixture coverage.                                                    |
| Limp                           | High                                    | First voluntary unopened Hero calls reconcile with current output.                                                               |
| CBet Flop                      | Medium-Low                              | Current output reconciles with code, but one all-in/no-decision hand is incorrectly counted as a CBet opportunity.               |
| Fold to CBet Flop              | Medium                                  | Counts reconcile; depends on correctly identifying opponent preflop aggressor and Hero response.                                 |
| WTSD                           | High for this file, Medium structurally | Current result exactly matches raw showdown-marker validation, but the model should still expose explicit showdown-marker state. |
| W$SD                           | High for this file, Medium structurally | Current result exactly matches raw showdown-marker validation, but the model should still expose explicit showdown-marker state. |
| HeroNetResult                  | High                                    | Independent contribution/refund/collection audit matches current parser for all parsed special hands.                            |
