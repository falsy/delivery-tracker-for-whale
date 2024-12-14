describe("배송 조회 페이지", () => {
  beforeEach(() => {
    // 배송 조회 박스 추가
    cy.intercept("GET", "https://parcel.falsy.me/carriers").as("getCarriers")
    cy.visit("http://localhost:2000")
    cy.wait("@getCarriers")
    cy.get("#create-tracker-button").click()
    cy.wait(500)
    cy.get("#tracker-list").find("li").should("exist")
  })

  it("배송 조회 박스 삭제", () => {
    cy.get(".delete-button").click()
    cy.wait(500)
    cy.get("#tracker-list").should("not.exist")
  })

  it("초기화", () => {
    cy.get("#reset-button").click()
    cy.wait(500)
    cy.get("#tracker-list").should("not.exist")
  })

  it("택배사 변경", () => {
    cy.get("button[aria-controls='carrier-select-box']").click()
    cy.wait(500)
    cy.get("#carrier-select-box").should("exist")
    cy.get("#carrier-select-box")
      .find("li")
      .eq(1)
      .invoke("text")
      .then((selectedText) => {
        cy.get("#carrier-select-box").find("li").eq(1).click()
        cy.get("button[aria-controls='carrier-select-box']").should(
          "have.text",
          selectedText.trim()
        )
      })
  })

  it("메모 추가 및 삭제", () => {
    cy.get("#create-memo-button").click()
    cy.wait(500)
    cy.get("#memo-list").find("li").should("exist")
    cy.wait(500)
    cy.get("#memo-list").find("li").eq(0).find(".delete-memo-button").click()
  })
})
